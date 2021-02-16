import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table/Table.js';
import Loader from './Loader/Loader';

class App extends Component {
    state ={
        isLoading: true,
        isEditMode : false,
        isAddMode:false,
        jsondata: [],
        id: null,
        name:null,
        email:null,
        age:null
    }

    constructor(props) {
        super(props);
        this.DeleteRow = this.DeleteRow.bind(this);
        this.EditRow = this.EditRow.bind(this);
        this.onChange = this.onChange.bind(this);
        this.SaveRow = this.SaveRow.bind(this);
        this.AddRowPost = this.AddRowPost.bind(this);

    }
    async componentDidMount() {

        const response = await fetch(` http://178.128.196.163:3000/api/records`)
        const jsondata = await response.json()
        console.log(jsondata)
        this.setState({
            isLoading: false,
            jsondata
        })
    }

    UpdateJsonState(action,id,dataPost){
        var indexArray = this.state.jsondata.map(function(o){return o._id;});
        var currentidno = indexArray.indexOf(id);
        let json=this.state.jsondata
        if (action==="edit"){
            json[currentidno].data.name=dataPost.data.name
            json[currentidno].data.email=dataPost.data.email
            json[currentidno].data.age=dataPost.data.age
        }
        if (action==="delete"){
            delete json[currentidno];
        }
        if (action==="add"){
            let jsonrow={_id:id,data: {id:dataPost.data.id, name: dataPost.data.name, email:dataPost.data.email,age: dataPost.data.age}}
            json.push(jsonrow)
        }
        this.setState({
            jsondata :json
        })

    }

    PostData(id,action,dataPost){
        fetch('http://178.128.196.163:3000/api/records/'+id,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(dataPost)
        }).then((response) => response.json())
            .then((responseJson) => {
                this.UpdateJsonState(action,id,dataPost)
                this.setState({
                    isEditMode:false,
                    isAddMode: false,
                    id: null,
                    name:null,
                    email:null,
                    age:null,
                })
            })
            .catch((error) => {
                alert("not ok");
                console.error(error);
            });
    }

    DeleteRow(id) {

        fetch('http://178.128.196.163:3000/api/records/'+id,{
            method: 'DELETE',

        }).then((response) => response.json())
            .then((responseJson) => {
                this.UpdateJsonState("delete",id)
            })
            .catch((error) => {
                alert("not ok");
                console.error(error);
            });

    }

    AddRowTable() {
        this.setState({
            isAddMode: true
        })
    }

    AddRowPost() {
        if (this.state.name==null && this.state.age==null && this.state.email==null){
            alert("Все поля пусты")
        }else{
            let dataPost = {
                data:{
                    name: this.state.name,
                    email: this.state.email,
                    age:   this.state.age
                }
            }
console.log("datapost:")
            console.log(dataPost)
            fetch('http://178.128.196.163:3000/api/records/',{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(dataPost)
            }).then((response) => response.json())
                .then((responseJson) => {
                    dataPost = {
                        data:{
                            id: responseJson._id,
                            name: responseJson.data.name,
                            email: responseJson.data.email,
                            age:   responseJson.data.age
                        }
                    }
                    this.PostData(responseJson._id,"add",dataPost)
                })
                .catch((error) => {
                    alert("not ok");
                    console.error(error);
                });
        }
    }

    EditRow(id) {

        this.setState({

            isEditMode:true,
            id: id
        })
//alert(id)
    }

    SaveRow(id,nameRow,emailRow,ageRow) {
if (this.state.name==null && this.state.age==null && this.state.email==null){
    alert("ничего не изменено")
    this.setState({
        isEditMode:false,
        id: null,
    })

}else{
    let namePost=this.state.name==null ? nameRow : this.state.name
    let emailPost=this.state.email==null ? emailRow : this.state.email
    let agePost=this.state.age==null ? ageRow : this.state.age
    const dataPost = {
        data:{
             name: namePost,
             email: emailPost,
             age:   agePost
        }
    }
    this.PostData(id,"edit",dataPost)
}

    }

    onChange  (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


  render() {

      return (
          <div className="App">
              <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  <h2>Welcome to React</h2>
              </div>

              <button className="addButton" onClick={(e) =>this.AddRowTable()}>Добавить</button>
              {
                  this.state.isLoading
                      ? <Loader />
                      :

                   <Table
                       jsondata={this.state.jsondata}

                       id={this.state.id}
                       isEditMode ={this.state.isEditMode}
                       isAddMode ={this.state.isAddMode}
                       DeleteRow={this.DeleteRow}
                       EditRow={this.EditRow}
                       SaveRow={this.SaveRow}
                       AddRowPost={this.AddRowPost}
                       onChange={this.onChange}

                      />

              }

          </div>
      );
  }
}

export default App;
