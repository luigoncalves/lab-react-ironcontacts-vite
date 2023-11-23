import './App.css';
import contactsList from './contacts.json';
import { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState(contactsList.slice(0, 5));
  const [copyContactsList, setCopyContactsList] = useState(
    contactsList.slice(5)
  );

  const addNewContact = () => {
    const newPersonIndex = [
      Math.floor(Math.random() * copyContactsList.length),
    ];
    const newPerson = copyContactsList[newPersonIndex];
    const updatedContacts = [...contacts, newPerson];

    setContacts(updatedContacts);

    const filterArr = [...copyContactsList];
    filterArr.splice(newPersonIndex, 1);

    setCopyContactsList(filterArr);
  };

  const sortName = () => {
    const sorted = JSON.parse(JSON.stringify(contacts));
    // to compare strings is better to use localeCompare
    sorted.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sorted);
  };

  const sortPopularity = () => {
    const sorted = JSON.parse(JSON.stringify(contacts));

    sorted.sort((a, b) => b.popularity - a.popularity);
    setContacts(sorted);
  };

  const deleteContact = id => {
    const filter = contacts.filter(person => id !== person.id);
    setContacts(filter);
  };

  return (
    <div className='App'>
      <h1>IronContacts</h1>
      <button onClick={addNewContact}>Add Random Contact</button>
      <button onClick={sortPopularity}>Sort By Popularity</button>
      <button onClick={sortName}>Sort By Name</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>

        {contacts.map(person => {
          return (
            <tr key={person.id}>
              <td>
                <img
                  src={person.pictureUrl}
                  alt='pic'
                  width={100}
                  height={150}
                />
              </td>
              <td>
                <p>{person.name}</p>
              </td>
              <td>
                <p>{person.popularity.toFixed(2)}</p>
              </td>
              <td>
                <p>{person.wonOscar ? '🏆' : ''}</p>
              </td>
              <td>
                <p>{person.wonEmmy ? '🌟' : ''}</p>
              </td>
              <td>
                <button onClick={() => deleteContact(person.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
