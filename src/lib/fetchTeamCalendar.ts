import { GameImport } from '~/types';

export const fetchTeamCalendar = async (vilvId: string) => {
  try {
    const response = await fetch('https://datalake-prod2018.rbfa.be/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        operationName: 'clubMatchesAssignations',
        variables: {
          clubId: vilvId,
          language: 'nl',
          //   sortByDate: 'asc',
          hasLocation: true,
          version: '1',
          startDate: '2025/08/22',
          endDate: '2026/06/30',
        },
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash: 'ae7ac199b18b57747ba6e3a8c26a19e022ac3f201508e28836bbeb9f8bd831be',
          },
        },
      }),
      cache: 'no-store', // Don't cache the response
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as { data: { clubMatchesAssignations: GameImport[] } };
    console.log(data.data.clubMatchesAssignations);

    if (!data?.data?.clubMatchesAssignations) {
      throw new Error('No calendar data found');
    }

    return data.data.clubMatchesAssignations;
  } catch (error) {
    console.error('Error fetching team calendar:', error);
    return [];
  }
};
