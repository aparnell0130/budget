let db;
const iDBRequest = indexedDB.open('budget', 1);

iDBRequest.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
}

iDBRequest.onsuccess = (event) => {
    db = event.target.result;

    const checkForIndexDb = () => {
        const transaction = db.transaction(['pending'], 'readwrite');
        const store = transaction.objectStore('pending');
        const getData = store.getAll();


    }
}
