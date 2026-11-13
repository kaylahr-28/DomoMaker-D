const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// const handleDomo = (e, onDomoAdded) => {
//     e.preventDefault();
//     helper.hideError();

//     const name = e.target.querySelector("#domoName").value;
//     const age = e.target.querySelector("#domoAge").value;
//     const desc = e.target.querySelector('#domoDesc').value;
//     if (!desc) desc = '';

//     if (!name || !age) {
//         helper.handleError(('All fields are required!'));
//         return false;
//     }

//     helper.sendPost(e.target.action, { name, age, desc }, onDomoAdded);
//     return false;
// }

const UserHeader = (props) => {
    return (
        <h1>All Users</h1>
    );
};

const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const formatDate = (date) => {
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        });
        return dateFormat.format(date);
    }
    useEffect(() => {
        const loadUsersFromServer = async () => {
            const response = await fetch('/getUsers');
            const data = await response.json();
            setUsers(data.users);
        };
        loadUsersFromServer();
    }, [props.reloadUsers]);

    if (users.length === 0) {
        return (
            <div className='domoList'>
                <h3 className='emptyDomo'>No Other Users Yet...</h3>
            </div>
        );
    }
    const userNodes = users.map(user => {
        return (
            <div key={user._id} className='domo'>
                <img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace' />
                <h3 className='domoName'>Username: {user.username}</h3>
                <h4>Joined {formatDate(user.dateCreated)}</h4>
            </div>
        );
    });

    return (
        <div className='domoList'>
            {userNodes}
        </div>
    );
};

const App = () => {

    return (
        <div>
            <UserHeader />
            <div id='domos'>
                <UserList />
            </div>
            {/* <div id='makeDomo'>
                <UserForm />
            </div>
             */}
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('users'));
    root.render(<App />);
};

window.onload = init;
