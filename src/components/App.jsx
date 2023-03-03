import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from '././App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const hendlerFormData = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    console.log(newContact);

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normaLized = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(contatc =>
      contatc.name.toLocaleLowerCase().includes(normaLized)
    );
    return filteredContacts;
  };

  return (
    <div className={css.wrap}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={hendlerFormData} contacts={contacts} />
      <h2 className={css.contact__title}>Contacts</h2>
      <Filter changeFilter={changeFilter} filter={filter} />
      {contacts.length === 0 && <h3>The list of contacts is empty.</h3>}
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

// export class App extends Component {

// changeFilter = e => {
//   this.setState({ filter: e.currentTarget.value });
// };

//   render() {
//     const { contacts, filter } = this.state;
// const normolaizedFilter = filter.toLowerCase();
// const filteredContacts = contacts.filter(contatc =>
//   contatc.name.toLowerCase().includes(normolaizedFilter)
// );
// return (
//   <div className={css.wrap}>
//     <h1 className={css.title}>Phonebook</h1>
//     <ContactForm
//       onSubmit={this.addContact}
//       contacts={this.state.contacts}
//     />
//     <h2 className={css.contact__title}>Contacts</h2>
//     <Filter changeFilter={this.changeFilter} filter={filter} />
//     {contacts.length === 0 && <h3>The list of contacts is empty.</h3>}
//     <ContactList
//       contacts={filteredContacts}
//       deleteContact={this.deleteContact}
//     />
//   </div>
// );
//   }
// }
