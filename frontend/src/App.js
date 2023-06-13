
import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [link, setLink] = useState('');
  const [newLink, setNewLink] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [showError, setshowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
 
  const baseUrl = 'http://localhost:5000/';

  const handleCreateLink = () => {
      axios.post(baseUrl+'create-link', {main_link:newLink})
        .then((res) => {
            if(res.data.error){
                setshowError(true);
                setShowLink(false);
                setErrMsg(res.data.message);
                return ;
            }
            setShowLink(true);
            setshowError(false);
            setLink(res.data.short_link);
            setNewLink('');
        })
        .catch((err) => console.log(err));
  }

  return (
    <div className="App">
        <div className='row justify-content-center'>
          <div className='col-md-8'>
              <div className="input-group mt-5">
                  <input
                      type="text"
                      className='form-control shadow-none'
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                  />
                  <button className="input-group-text btn btn-primary " onClick={handleCreateLink}> Short Link
                  </button>
              </div>
             
              {showLink ?
                  <div className="alert alert-success mt-3" role="alert">
                      <h5>{link}</h5>
                  </div>
                  :
                  ''
              }
              {showError ?
                  <div className="alert alert-danger mt-3" role="alert">
                      <h5>{errMsg}</h5>
                  </div>
                  :
                  ''
              }
              
          </div>
      </div>
    </div>
  );
}

export default App;
