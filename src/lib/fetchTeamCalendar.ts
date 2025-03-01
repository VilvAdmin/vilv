export const fetchTeamCalendar = async (vilvId: string) => {
    try {
        const response = await fetch('https://datalake-prod2018.rbfa.be/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                operationName: 'GetTeamCalendar',
                variables: {
                    teamId: vilvId,
                    language: 'nl',
                    sortByDate: 'asc'
                },
                extensions: {
                    persistedQuery: {
                        version: 1,
                        sha256Hash: '63e80713dbe3f057aafb53348ebb61a2c52d3d6cda437d8b7e7bd78191990487'
                    }
                }
            }),
            cache: 'no-store', // Don't cache the response
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data?.data?.teamCalendar) {
            throw new Error('No calendar data found');
        }

        return data.data.teamCalendar;
    } catch (error) {
        console.error('Error fetching team calendar:', error);
        throw error;
    }
};