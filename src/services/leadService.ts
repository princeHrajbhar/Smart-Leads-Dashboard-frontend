import { axiosInstance } from '../lib/axios';

import type {
  Lead,
  LeadFilters,
  PaginatedResponse,
} from '../types';

export const leadService = {
  async getLeads(
    filters: LeadFilters
  ): Promise<
    PaginatedResponse<Lead>
  > {
    const params =
      new URLSearchParams();

    if (filters.status)
      params.append(
        'status',
        filters.status
      );

    if (filters.source)
      params.append(
        'source',
        filters.source
      );

    if (filters.search)
      params.append(
        'search',
        filters.search
      );

    if (filters.page)
      params.append(
        'page',
        filters.page.toString()
      );

    if (filters.limit)
      params.append(
        'limit',
        filters.limit.toString()
      );

    if (filters.sort)
      params.append(
        'sort',
        filters.sort
      );

    const response =
      await axiosInstance.get(
        `/leads?${params.toString()}`
      );

    const apiData =
      response.data;

    return {
      success:
        apiData.success,
      data:
        apiData.leads || [],
      pagination:
        apiData.pagination,
    };
  },

  async getLead(
    id: string
  ): Promise<Lead> {
    const response =
      await axiosInstance.get(
        `/leads/${id}`
      );

    return response.data.lead;
  },

  async createLead(
    lead: Partial<Lead>
  ): Promise<Lead> {
    const response =
      await axiosInstance.post(
        '/leads',
        lead
      );

    return response.data.lead;
  },

  async updateLead(
    id: string,
    lead: Partial<Lead>
  ): Promise<Lead> {
    const response =
      await axiosInstance.put(
        `/leads/${id}`,
        lead
      );

    return response.data.lead;
  },

  async deleteLead(
    id: string
  ): Promise<void> {
    await axiosInstance.delete(
      `/leads/${id}`
    );
  },

  // =========================
  // EXPORT CSV
  // =========================
  async exportLeadsCSV(): Promise<void> {
    const response =
      await axiosInstance.get(
        '/leads/export/csv',
        {
          responseType:
            'blob',
        }
      );

    const blob =
      new Blob([
        response.data,
      ]);

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        'a'
      );

    link.href = url;

    link.setAttribute(
      'download',
      'leads.csv'
    );

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    window.URL.revokeObjectURL(
      url
    );
  },
};