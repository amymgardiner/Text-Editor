import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction, specify the DB we are posting to and the data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const store = tx.objectStore('jate');
  // pass in content
  const request = store.put({ id: 1, value: content });
  // confirm the data was added
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
