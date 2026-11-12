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

const UserForm = (props) => {
    return (
        <div>this is the users page</div>
    );
};

const UserList = (props) => {
    const [users, setUsers] = useState(props.users);

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
                <h3 className='emptyDomo'>No Users Yet...</h3>
            </div>
        );
    }

    const userNodes = user.map(user => {
        return (
            <div key={user.id} className='domo'>
                <img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace' />
                <h3 className='domoName'>Name: {user.username}</h3>
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
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
            <div id='makeDomo'>
                <UserForm />
            </div>
            <div id='domos'>
                <UserList domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;
