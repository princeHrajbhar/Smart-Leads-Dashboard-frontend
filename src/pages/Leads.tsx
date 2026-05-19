import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { LeadsTable } from '../components/tables/LeadsTable';
import { LeadForm } from '../components/forms/LeadForm';
import { TableSkeleton } from '../components/loaders/Skeleton';
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from '../hooks/useLeads';
import { useDebounce } from '../hooks/useDebounce';
import { LeadStatusEnum, LeadSourceEnum } from '../types/enums';
import type { Lead, LeadFilters } from '../types';
import { useAuthStore } from '../store/authStore';
import { Download } from 'lucide-react';
import { leadService } from '../services/leadService';

export const Leads: React.FC = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';
  const [filters, setFilters] = useState<LeadFilters>({
    page: 1,
    limit: 10,
    sort: 'latest',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, refetch } = useLeads({
    ...filters,
    search: debouncedSearch || undefined,
  });

  const createLeadMutation = useCreateLead();
  const updateLeadMutation = useUpdateLead();
  const deleteLeadMutation = useDeleteLead();

  const handleCreateLead = async (data: Partial<Lead>) => {
    await createLeadMutation.mutateAsync(data);
    setIsModalOpen(false);
    refetch();
  };

  const handleUpdateLead = async (data: Partial<Lead>) => {
    if (selectedLead) {
      await updateLeadMutation.mutateAsync({ id: selectedLead._id, lead: data });
      setIsModalOpen(false);
      setSelectedLead(null);
      refetch();
    }
  };

  const handleDeleteLead = async () => {
    if (leadToDelete) {
      await deleteLeadMutation.mutateAsync(leadToDelete);
      setIsDeleteModalOpen(false);
      setLeadToDelete(null);
      refetch();
    }
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setLeadToDelete(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track all your leads</p>
        </div>
     {isAdmin && (
  <div className="flex items-center gap-3">
    <Button
      variant="secondary"
      onClick={() =>
        leadService.exportLeadsCSV()
      }
    >
      <Download className="w-4 h-4 mr-2" />
      Export CSV
    </Button>

    <Button
      onClick={() =>
        setIsModalOpen(true)
      }
    >
      <Plus className="w-4 h-4 mr-2" />
      Add Lead
    </Button>
  </div>
)}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            options={[
              { value: '', label: 'All Status' },
              ...Object.entries(LeadStatusEnum).map(([key, value]) => ({ value, label: key })),
            ]}
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as any, page: 1 })}
          />
          <Select
            options={[
              { value: '', label: 'All Sources' },
              ...Object.entries(LeadSourceEnum).map(([key, value]) => ({ value, label: key.replace('_', ' ') })),
            ]}
            value={filters.source || ''}
            onChange={(e) => setFilters({ ...filters, source: e.target.value as any, page: 1 })}
          />
          <Select
            options={[
              { value: 'latest', label: 'Latest First' },
              { value: 'oldest', label: 'Oldest First' },
            ]}
            value={filters.sort || 'latest'}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value as any })}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton />
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <>
            <LeadsTable
              leads={data.data}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onView={(lead) => openEditModal(lead)}
            />

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t dark:border-gray-700">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {((filters.page || 1) - 1) * (filters.limit || 10) + 1} to{' '}
                {Math.min((filters.page || 1) * (filters.limit || 10), data.pagination.total)} of{' '}
                {data.pagination.total} results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })}
                  disabled={filters.page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
                  disabled={filters.page === data.pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No leads found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLead(null);
        }}
        title={selectedLead ? 'Edit Lead' : 'Create New Lead'}
        size="lg"
      >
        <LeadForm
          initialData={selectedLead || undefined}
          onSubmit={selectedLead ? handleUpdateLead : handleCreateLead}
          isLoading={createLeadMutation.isPending || updateLeadMutation.isPending}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setLeadToDelete(null);
        }}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this lead? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteLead}
              isLoading={deleteLeadMutation.isPending}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};