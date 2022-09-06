export const addDeviceToGroupService = (
  notificationToken: string,
  token: string,
  groupName: string
) => {
  const myHeaders: Headers = new Headers();
  myHeaders.append('Authorization', `key=${process.env.FIREBASE_AUTH_KEY}`);
  myHeaders.append('project_id', process.env.FIREBASE_PROJECT_ID);
  myHeaders.append('key', process.env.FIREBASE_AUTH_KEY);
  myHeaders.append('Content-Type', 'application/json');

  const raw: string = JSON.stringify({
    operation: 'add',
    notification_key_name: groupName,
    notification_key: notificationToken,
    registration_ids: [token]
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch('https://fcm.googleapis.com/fcm/notification', requestOptions)
    .then(async (response): Promise<string> => await response.text())
    .catch((error) => console.log('error', error));
};
