export const fetchTeamCalendar = async (vilvId: string) => {
    const response = await fetch('https://datalake-prod2018.rbfa.be/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
      })
    });
    const data = await response.json();
    return data?.data?.teamCalendar
  }