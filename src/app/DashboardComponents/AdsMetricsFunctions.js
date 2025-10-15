export const AdsMetricsApiService = {
    // Fetch overall dashboard metrics
    fetchDashboardMetrics: async () => {
      try {
        const response = await fetch('/api/dashboard/metrics');
        if (!response.ok) throw new Error('Failed to fetch metrics');
        return await response.json();
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
        throw error;
      }
    },
  
    // Fetch all ads
    fetchAds: async (Cursor,excludeDocsIds) => {
      try {
        const response = await fetch('https://adopte.gotdns.ch/api8/adsMetricDasboard/fetch/ads',{
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({Cursor,excludeDocsIds}),
          method:"POST",
          credentials:"include"
        });
        
        const result =  await response.json();
        return {
          result,
          Status:response.status
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
        return {
          result,
          Status:500,
          error,
        }
      }
    },
  
    // Fetch specific ad data for a date
    fetchAdData: async (adId, date,weekNumber) => {
      console.log(weekNumber)
      try {
        const response = await fetch(`https://adopte.gotdns.ch/api8/Ads/Fetch/Metrics/ByDate/${adId}/${date}`,{
            headers:{
                'Content-Type':"application/json"
            },
            method:"GET",
            credentials:"include"
        });
        if (!response.ok) throw new Error('Failed to fetch ad data');
        return await response.json();
      } catch (error) {
        // console.error('Error fetching ad data:', error);
         throw error;
      }
    },
  
    // Update ad status
    updateAdStatus: async (adId, status) => {
      try {
        const response = await fetch(`/api/ads/${adId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Failed to update ad status');
        return await response.json();
      } catch (error) {
        // console.error('Error updating ad status:', error);
        throw error;
      }
    }
  };