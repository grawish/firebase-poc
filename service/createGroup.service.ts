export const createGroup = async (
  groupName: string,
  registration_id: string
) => {
  const myHeaders: Headers = new Headers();
  myHeaders.append('Authorization', `key=${process.env.FIREBASE_AUTH_KEY}`);
  myHeaders.append('project_id', process.env.FIREBASE_PROJECT_ID || '');
  myHeaders.append('key', process.env.FIREBASE_AUTH_KEY || '');
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    operation: 'create',
    notification_key_name: groupName,
    registration_ids: [registration_id]
  });

  return fetch('https://fcm.googleapis.com/fcm/notification', {
    method: 'POST',
    headers: myHeaders as HeadersInit,
    body: raw,
    redirect: 'follow'
  })
    .then((response) => response.text())
    .catch((error) => console.log('error', error));
};
