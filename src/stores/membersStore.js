import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';

class MembersStore {
  members = [];

  constructor() {
    makeObservable(this, {
      members: observable,
      fetchMembers: action,
      createMember: action,
      changeMembersBook: action,
    });
  }

  fetchMembers = async () => {
    try {
      const response = await axios.get(
        'https://library-borrow-system.herokuapp.com/api/members'
      );
      // console.log(response.data);

      this.members = response.data;
    } catch (error) {
      console.log('fetchMembers', error);
    }
  };
  createMember = async (member) => {
    try {
      const response = await axios.post(
        'https://library-borrow-system.herokuapp.com/api/members',
        member
      );
      this.members = [...this.members, response.data];
    } catch (error) {
      console.log('createMember', error);
    }
  };

  changeMembersBook = (member) => {
    this.members = [...this.members, member];
  };
}
const membersStore = new MembersStore();
membersStore.fetchMembers();
export default membersStore;
