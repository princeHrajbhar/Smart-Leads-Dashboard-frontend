// Test utility to verify API endpoints work correctly with backend
import { leadService } from '../services/leadService';
import type { Lead } from '../types';

export const testLeadAPI = async () => {
    console.log('🧪 Testing Lead API endpoints (aligned with backend)...');

    try {
        // Test 1: Get all leads
        console.log('📋 Testing GET /api/leads');
        const leadsResponse = await leadService.getLeads({ page: 1, limit: 10 });
        console.log('✅ Get leads successful:', leadsResponse);

        // Test 2: Create a new lead (matching backend schema)
        console.log('➕ Testing POST /api/leads');
        const newLead: Partial<Lead> = {
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            phone: "+91 9876543210",
            company: "Tech Corp",
            status: "QUALIFIED",
            source: "INSTAGRAM",
            note: "Test lead created from frontend API test"
        };

        const createdLead = await leadService.createLead(newLead);
        console.log('✅ Create lead successful:', createdLead);

        // Test 3: Get single lead
        if (createdLead._id) {
            console.log('👤 Testing GET /api/leads/:id');
            const singleLead = await leadService.getLead(createdLead._id);
            console.log('✅ Get single lead successful:', singleLead);

            // Test 4: Update lead (using valid backend statuses)
            console.log('✏️ Testing PUT /api/leads/:id');
            const updatedLead = await leadService.updateLead(createdLead._id, {
                status: "CONTACTED",
                note: "Updated: Lead has been contacted successfully",
                company: "Updated Tech Corp"
            });
            console.log('✅ Update lead successful:', updatedLead);

            // Test 5: Delete lead (Admin only - will fail if not admin)
            console.log('🗑️ Testing DELETE /api/leads/:id');
            try {
                await leadService.deleteLead(createdLead._id);
                console.log('✅ Delete lead successful');
            } catch (deleteError: any) {
                console.log('⚠️ Delete failed (might not be admin):', deleteError.response?.data?.message);
            }
        }

        // Test 6: Filtering examples (using backend-supported values)
        console.log('🔍 Testing filtering with backend-supported values...');

        // Filter by status (backend supports: NEW, CONTACTED, QUALIFIED, LOST)
        const qualifiedLeads = await leadService.getLeads({ status: 'QUALIFIED' });
        console.log('✅ Filter by status (QUALIFIED):', qualifiedLeads);

        // Filter by source (backend supports: WEBSITE, INSTAGRAM, REFERRAL)
        const instagramLeads = await leadService.getLeads({ source: 'INSTAGRAM' });
        console.log('✅ Filter by source (INSTAGRAM):', instagramLeads);

        // Search (backend searches: name, email, phone, company, note)
        const searchResults = await leadService.getLeads({ search: 'rahul' });
        console.log('✅ Search results (rahul):', searchResults);

        // Sort latest (backend supports: latest, oldest)
        const latestLeads = await leadService.getLeads({ sort: 'latest' });
        console.log('✅ Sort latest:', latestLeads);

        // Sort oldest
        const oldestLeads = await leadService.getLeads({ sort: 'oldest' });
        console.log('✅ Sort oldest:', oldestLeads);

        // Multiple filters combined
        const complexFilter = await leadService.getLeads({
            status: 'QUALIFIED',
            source: 'INSTAGRAM',
            search: 'tech',
            page: 1,
            limit: 5,
            sort: 'latest'
        });
        console.log('✅ Complex filtering:', complexFilter);

        // Test pagination
        const paginatedResults = await leadService.getLeads({
            page: 1,
            limit: 3
        });
        console.log('✅ Pagination test (page 1, limit 3):', paginatedResults);

        console.log('🎉 All API tests completed successfully!');
        console.log('📊 Backend Schema Summary:');
        console.log('   - Statuses: NEW, CONTACTED, QUALIFIED, LOST');
        console.log('   - Sources: WEBSITE, INSTAGRAM, REFERRAL');
        console.log('   - Fields: name, email, phone, company, note, status, source');
        console.log('   - Search: name, email, phone, company, note');
        console.log('   - Sort: latest, oldest');

    } catch (error: any) {
        console.error('❌ API test failed:', error);
        console.error('Response:', error.response?.data);
        throw error;
    }
};

// Helper to test API in browser console
(window as any).testLeadAPI = testLeadAPI;