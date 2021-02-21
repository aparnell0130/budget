const iDBRequest = indexedDB.open('budget', 1);

iDBRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
}