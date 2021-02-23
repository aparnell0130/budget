let db;
const iDBRequest = indexedDB.open('budget', 1);

iDBRequest.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
}

iDBRequest.onsuccess = (event) => {
    db = event.target.result;


    if (navigator.onLine) {
        checkForIndexDb();
    }
};

iDBRequest.onerror = (event) => {
    console.log(`ERROR: ${event.target.errorCode}`)
}

const saveRecord = (record) => {
    const transaction = db.transaction('pending', 'readwrite');
    const store = transaction.objectStore('pending');

    store.add(record);
}

const checkForIndexDb = () => {
    const transaction = db.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending');
    const getData = store.getAll();

    getData.onsuccess = () => {
        if (getData.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getData.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(data => data.json())
                .then(() => {
                    const transaction = db.transaction(['pending'], 'readwrite');
                    const store = transaction.objectStore('pending');

                    store.clear();
                });
        }
    };
};