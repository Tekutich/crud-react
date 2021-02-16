import React from 'react';
import './Table.css';
import '../Buttons/Buttons.css';

export default props => (
<div className="containerTable">
    <table className="tableview">
        <thead>
        <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>E-mail</th>
            <th>Возраст</th>
            <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        { props.isAddMode  ?
            <tr key="0">
                <td>Добавление строки</td>
                <td><input type="text" className="name" name="name"   onChange={props.onChange}/></td>
                <td><input type="text" className="name" name="email"   onChange={props.onChange}/></td>
                <td><input type="text" className="name" name="age"   onChange={props.onChange}/></td>
                <td><button className="AddButtonTable" onClick={(e) =>props.AddRowPost()}>Добавить</button></td>

            </tr>

            : null}
        { props.jsondata.map(item =>(
            <tr key={item._id}>
                <td>{item._id}</td>

                {props.isEditMode && item._id===props.id ?
                <td><input type="text" className="name" name="name" defaultValue={item.data.name}  onChange={props.onChange}/> </td>
                    : <td>{item.data.name}</td>}

                {props.isEditMode && item._id===props.id ?
                    <td><input type="text"  className="name" name="email" defaultValue={item.data.email} onChange={props.onChange}/> </td>
                    : <td>{item.data.email}</td>}
                {props.isEditMode && item._id===props.id ?
                    <td><input type="text"  className="name" name="age" defaultValue={item.data.age} onChange={props.onChange} /></td>
                    : <td>{item.data.age}</td>}

                {props.isEditMode && item._id===props.id ?
                    <td>
                        <button className="deleteButton"
                            onClick={(e) =>props.DeleteRow(item._id)}
                        >Удалить</button>
                        <button className="saveButton"
                            onClick={(e) =>props.SaveRow(item._id,item.data.name,item.data.email,item.data.age)}
                        >Сохранить</button>
                    </td>
                    :

                <td>
                    <button className="deleteButton"
                            onClick={(e) => props.DeleteRow(item._id)}
                >Удалить</button>
                    <button className="editButton"
                            onClick={(e) => props.EditRow(item._id)}
                    >Редактировать</button>
                </td>}
            </tr>
        ))}
        </tbody>
    </table>
</div>
)