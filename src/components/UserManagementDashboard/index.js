import { Component } from "react";
import './index.css'
class UserManagementDashboard extends Component{
    state={users:[],selectedUser:null,formData:({ id: '', firstName: '', lastName: '', email: '', department: '' }),error:""}
    componentDidMount (){
        this.userdetails()
     }

     userdetails= async()=>{
        const url = 'https://jsonplaceholder.typicode.com/users'
        const options = {
          method: 'get'
        }
        const response = await fetch(url, options)
        const data = await response.json()
      
        const updatedData=data.map(eachData=>({
          id:eachData.id,
          fullname:eachData.name,
          email:eachData.email,
          department:eachData.company.name
    
        }))
      
        if(response.ok===true){
            this.setState({users:updatedData})
        //   setUsers(updatedData)
        }else{
          this.setState({error:'Failed to fetch users. Please try again.'})
        }
      }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState=>({
            formData:{...prevState.formData, [name]: value}
         }))
      };


      handleAddUser = async(event) => {
        event.preventDefault()
        const {formData, users}=this.state
        
          const data=[formData]
          
    
         
          const details=data.map(each=>({
            id:users.length+1,
            fullname:each.firstName+" "+each.lastName,
            email:each.email,
            department:each.department
          }))
          
          this.setState(prevState=>({
            users:[...prevState.users, ...details]
         }))
    
         
          this.setState({formData:({ id: '', firstName: '', lastName: '', email: '', department: '' })})
    
        }
       
         handleEditUser = async() => {
            const {users,selectedUser,formData}=this.state
            console.log(formData)
   
            const url = `https://jsonplaceholder.typicode.com/users/${selectedUser.id}`
            const options = {
              method: 'put'
            }
            const response = await fetch(url, options)
            const data = await response.json()
            
           
            const updatedata=[formData]
            const user=updatedata.map(each=>({
              id:each.id,
              fullname:each.firstName+" "+each.lastName,
              email:each.email,
              department:each.department
      
        }))
        console.log(user)
         const value=user[0]
        users[(data.id)-1]=(value)
            console.log(users)
       
      
           
            if(response.ok===true){
                this.setState({
                    users:[...users]
                 })
                
            }
        
    else{
             this.setState({error:'Failed to fetch users. Please try again.'})
            }
          this.setState({formData:({ id: '', firstName: '', lastName: '', email: '', department: '' })})
           
          }

           handleDeleteUser = async(id) => {

           
              const url = `https://jsonplaceholder.typicode.com/users/${id}`
        
              const options = {
                method: 'delete'
              }
              const response = await fetch(url, options)
            //   const data = await response.json()
              
              console.log(id)
              if(response.ok===true){
                this.setState(prevState=>({
                    users:prevState.users.filter((user)=>user.id !== id)
                 }))
              }else{
                this.setState({error:'Failed to fetch users. Please try again.'})              }
            }
     
        openEditForm = (user) => {

                
                this.setState({selectedUser:user})
                this.setState({formData:{id: user.id,
                    firstName: user.fullname.split(' ')[0],
                    lastName: user.fullname.split(' ')[1],
                    email: user.email,
                    department: user.department}})
                
                
               
              };
         
    
    render(){
        const {selectedUser,formData,users,error}=this.state
        return(
            <div className="p-4">
            <h1 className="text-xl font-bold mb-4 heading">User Management Dashboard</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
      
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {users.map((user) => (
                <ul key={user.id} className="user-details-container">
                  <div>
                    <li><strong>ID:</strong> {user.id}</li>
                    <li><strong>FullName:</strong> {user.fullname}</li>
                    
                    <li><strong>Email:</strong> {user.email}</li>
                    <li><strong>Department:</strong> {user.department}</li>
                    <div className="mt-2 flex gap-2 buttons-container">
                      <button className="edit-button" onClick={() => this.openEditForm(user)}>Edit</button>
                      <button variant="destructive" className="delete-button" onClick={() =>this.handleDeleteUser(user.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </ul>
              ))}
            </div>
      
       
            <div className="bg-gray-100 p-4 rounded-md form-container">
              <h2 className="text-lg font-bold mb-2">{selectedUser ? 'Edit User' : 'Add User'}</h2>
              <div className="grid grid-cols-1 gap-2">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={this.handleInputChange}
                /><br/>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={this.handleInputChange}
                /><br/>
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={this.handleInputChange}
                /><br/>
                <input
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={this.handleInputChange}
                /><br/>
                <button
                  className="mt-2 adduser-button"
                  onClick={selectedUser ? this.handleEditUser : this.handleAddUser}
                >
                  {selectedUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
        
      

        )
    }
}

export default UserManagementDashboard