import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useToken from './useToken';
import DatePicker from "react-multi-date-picker";

const AddTask = ({ onSave }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState(new Date());
    const [author, setAuthor] = useState(useToken().token);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task and date or close the form!'
            })
        } else if (!text && day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task!'
            })
        } else if (text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your date!'
            })
        } else {
            onSave({ text, day, author });
        }
        setText('');
        setDay('');
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="add task" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <DatePicker selected={day} onChange={(date) => setDay(date)} />

            </div>

            <input type="submit" className="btn btn-block" value="Save Task" />
        </form>
    )
}
/*<input type="text" placeholder="add day & time" value={day} onChange={(e) => setDay(e.target.value)} />
*/
export default AddTask