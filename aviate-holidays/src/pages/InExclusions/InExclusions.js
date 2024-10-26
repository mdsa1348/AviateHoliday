import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./InExclusions.css";

const InExclusions = () => {




    const [Inclusions, setInclusions] = useState([]);
    const [newInclusion, setNewInclusion] = useState("");
    const [editInclusionsId, setEditInclusionsId] = useState(null);
    const [editInclusionsName, setEditInclusionsName] = useState("");
    const [selectedInclusion, setSelectedInclusion] = useState("");
    
    const [Exclusions, setExclusions] = useState([]);
    const [newExclusion, setNewExclusion] = useState("");
    const [editExclusionsId, setEditExclusionsId] = useState(null);
    const [editExclusionsName, setEditExclusionsName] = useState("");
    const [selectedExclusion, setSelectedExclusion] = useState("");

    const [TCs, setTCs] = useState([]);
    const [newTC, setNewTC] = useState("");
    const [editTCsId, setEditTCsId] = useState(null);
    const [editTCsName, setEditTCsName] = useState("");
    const [selectedTC, setSelectedTC] = useState("");

    const [CPs, setCPs] = useState([]);
    const [newCP, setNewCP] = useState("");
    const [editCPsId, setEditCPsId] = useState(null);
    const [editCPsName, setEditCPsName] = useState("");
    const [selectedCP, setSelectedCP] = useState("");


    var count = 1;
    var Excount = 1;
    var Tc = 1;
    var Cp = 1;

    useEffect(() => {
        fetchInclusions();
        fetchExclusions();
        fetchTCs();
        fetchCPs();

    }, []);

    

    const fetchInclusions = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/Inclusions");
            setInclusions(response.data);
            //console.log('Fetched Data:', response.data);

        } catch (error) {
            console.error("Error fetching Inclusions:", error);
        }
    };

    
    const handleAddInclusions = async () => {
        try {
             await axios.post("http://localhost:3001/api/Inclusions", { name: newInclusion });
          
            
            setNewInclusion("");
            fetchInclusions();
            alert(`Inclusions ${newInclusion} added successfully.`);
        } catch (error) {
            console.error("Error adding Inclusions:", error);
            alert("Failed to add Inclusions.");
        }
    };

    const handleEditInclusions = async () => {
        try {
            await axios.put(`http://localhost:3001/api/Inclusions/${editInclusionsId}`, { name: editInclusionsName });
            
            setEditInclusionsId(null);
            setEditInclusionsName("");
            fetchInclusions();
            alert(`Inclusions updated successfully.`);
        } catch (error) {
            console.error("Error updating Inclusions:", error);
            alert("Failed to update Inclusions.");
        }
    };

    const handleDeleteInclusions = async (InclusionsId) => {
        try {
            await axios.delete(`http://localhost:3001/api/Inclusions/${InclusionsId}`);
            
            fetchInclusions();
            alert(`Inclusions deleted successfully.`);
        } catch (error) {
            console.error("Error deleting Inclusions:", error);
            alert("Failed to delete Inclusions.");
        }
    };

    const startEditingInclusions = (InclusionsId, InclusionsName) => {
        setEditInclusionsId(InclusionsId);
        setEditInclusionsName(InclusionsName);
    };

    
//exclusions 

const fetchExclusions = async () => {
    try {
        const response = await axios.get("http://localhost:3001/api/exclusions");
        setExclusions(response.data);
        //console.log('Fetched Data:', response.data);

    } catch (error) {
        console.error("Error fetching Exclusions:", error);
    }
};


const handleAddExclusions = async () => {
    try {
         await axios.post("http://localhost:3001/api/exclusions", { name: newExclusion });
      
        
        setNewExclusion("");
        fetchExclusions();
        alert(`Exclusions ${newExclusion} added successfully.`);
    } catch (error) {
        console.error("Error adding Exclusions:", error);
        alert("Failed to add Exclusions.");
    }
};

const handleEditExclusions = async () => {
    try {
        await axios.put(`http://localhost:3001/api/exclusions/${editExclusionsId}`, { name: editExclusionsName });
        
        setEditExclusionsId(null);
        setEditExclusionsName("");
        fetchExclusions();
        alert(`Exclusions updated successfully.`);
    } catch (error) {
        console.error("Error updating Exclusions:", error);
        alert("Failed to update Exclusions.");
    }
};

const handleDeleteExclusions = async (ExclusionsId) => {
    try {
        await axios.delete(`http://localhost:3001/api/exclusions/${ExclusionsId}`);
        
        fetchExclusions();
        alert(`Exclusions deleted successfully.`);
    } catch (error) {
        console.error("Error deleting Exclusions:", error);
        alert("Failed to delete Exclusions.");
    }
};

const startEditingExclusions = (ExclusionsId, ExclusionsName) => {
    setEditExclusionsId(ExclusionsId);
    setEditExclusionsName(ExclusionsName);
};
   

    
//Termn COnditons 

const fetchTCs = async () => {
    try {
        const response = await axios.get("http://localhost:3001/api/tour-details");
        setTCs(response.data);

        // setInclusions(parseJSON(inclusions));
        //console.log('Fetched Data:', response.data);

    } catch (error) {
        console.error("Error fetching TCs:", error);
    }
};



const handleAddTCs = async () => {
    try {
         await axios.post("http://localhost:3001/api/tour-details", { name: newTC });
      
        
        setNewTC("");
        fetchTCs();
        alert(`TCs ${newTC} added successfully.`);
    } catch (error) {
        console.error("Error adding TCs:", error);
        alert("Failed to add TCs.");
    }
};
   
const handleEditTCs = async () => {
    try {
        await axios.put(`http://localhost:3001/api/tour-details/${editTCsId}`, { name: editTCsName });
        
        setEditTCsId(null);
        setEditTCsName("");
        fetchTCs();
        alert(`TCs updated successfully.`);
    } catch (error) {
        console.error("Error updating TCs:", error);
        alert("Failed to update TCs.");
    }
};

const handleDeleteTCs = async (TCsId) => {
    try {
        await axios.delete(`http://localhost:3001/api/tour-details/${TCsId}`);
        
        fetchTCs();
        alert(`TCs deleted successfully.`);
    } catch (error) {
        console.error("Error deleting TCs:", error);
        alert("Failed to delete TCs.");
    }
};

const startEditingTCs = (TCsId, TCsName) => {
    setEditTCsId(TCsId);
    setEditTCsName(TCsName);
};



//Cancelling Policy 

const fetchCPs = async () => {
    try {
        const response = await axios.get("http://localhost:3001/api/CPs");
        setCPs(response.data);

        // setInclusions(parseJSON(inclusions));
        //console.log('FeCPhed Data:', response.data);

    } catch (error) {
        console.error("Error feCPhing CPs:", error);
    }
};



const handleAddCPs = async () => {
    try {
         await axios.post("http://localhost:3001/api/CPs", { name: newCP });
      
        
        setNewCP("");
        fetchCPs();
        alert(`CPs ${newCP} added successfully.`);
    } catch (error) {
        console.error("Error adding CPs:", error);
        alert("Failed to add CPs.");
    }
};
   
const handleEditCPs = async () => {
    try {
        await axios.put(`http://localhost:3001/api/CPs/${editCPsId}`, { name: editCPsName });
        
        setEditCPsId(null);
        setEditCPsName("");
        fetchCPs();
        alert(`CPs updated successfully.`);
    } catch (error) {
        console.error("Error updating CPs:", error);
        alert("Failed to update CPs.");
    }
};

const handleDeleteCPs = async (CPsId) => {
    try {
        await axios.delete(`http://localhost:3001/api/CPs/${CPsId}`);
        
        fetchCPs();
        alert(`CPs deleted successfully.`);
    } catch (error) {
        console.error("Error deleting CPs:", error);
        alert("Failed to delete CPs.");
    }
};

const startEditingCPs = (CPsId, CPsName) => {
    setEditCPsId(CPsId);
    setEditCPsName(CPsName);
};




    return (
        <div className="container">
            <h1>Import Page</h1>

            <div className="row col_row">
                <div className="col-6 col_6">
                    <div className='Add'>
                        <h2>Add New Inclusion:</h2>
                        <input
                            type="text"
                            value={newInclusion}
                            onChange={(e) => setNewInclusion(e.target.value)}
                        />
                        <button onClick={handleAddInclusions}>Add Inclusion</button>
                    </div>

                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Inclusions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Inclusions.map((Inclusion) => (
                                    
                                    <tr key={Inclusion.ID}>
                                        <td>
                                            {count++}

                                        </td>
                                        <td>
                                            {editInclusionsId === Inclusion.ID ? (
                                                <input
                                                    type="text"
                                                    value={editInclusionsName}
                                                    onChange={(e) => setEditInclusionsName(e.target.value)}
                                                />
                                            ) : (
                                                Inclusion.Inclusion
                                            )}
                                        </td>
                                        <td>
                                            {editInclusionsId === Inclusion.ID ? (
                                                <button onClick={handleEditInclusions}>Save</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditingInclusions(Inclusion.ID, Inclusion.Inclusion)}>Edit</button>
                                                    <button onClick={() => handleDeleteInclusions(Inclusion.ID)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-6 col_6">
                    <div className='Add'>
                        <h2>Add New Exclusions:</h2>
                        <input
                            type="text"
                            value={newExclusion}
                            onChange={(e) => setNewExclusion(e.target.value)}
                        />
                        <button onClick={handleAddExclusions}>Add Exclusion</button>
                    </div>

                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Exclusions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Exclusions.map((Exclusion) => (
                                    
                                    <tr key={Exclusion.id}>
                                        <td>
                                            {Excount++}

                                        </td>
                                        <td>
                                            {editExclusionsId === Exclusion.id ? (
                                                <input
                                                    type="text"
                                                    value={editExclusionsName}
                                                    onChange={(e) => setEditExclusionsName(e.target.value)}
                                                />
                                            ) : (
                                                Exclusion.exclusion
                                            )}
                                        </td>
                                        <td>
                                            {editExclusionsId === Exclusion.id ? (
                                                <button onClick={handleEditExclusions}>Save</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditingExclusions(Exclusion.id, Exclusion.exclusion)}>Edit</button>
                                                    <button onClick={() => handleDeleteExclusions(Exclusion.id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <div className="row col_row" style={{marginTop:'4vh'}}>
                <div className="col-6 col_6">
                    <div className='Add'>
                        <h2>Add New Terms and Conditions:</h2>
                        <input
                            type="text"
                            value={newTC}
                            onChange={(e) => setNewTC(e.target.value)}
                        />
                        <button onClick={handleAddTCs}>Add Inclusion</button>
                    </div>

                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Terms and Conditions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TCs.map((TC) => (
                                    
                                    <tr key={TC.id}>
                                        <td>
                                            {Tc++}

                                        </td>
                                        <td >
                                            {editTCsId === TC.id ? (
                                                <input
                                                    type="text"
                                                    value={editTCsName}
                                                    onChange={(e) => setEditTCsName(e.target.value)}
                                                />
                                            ) : (
                                                TC.terms
                                            )}
                                        </td>
                                        <td>
                                            {editTCsId === TC.id ? (
                                                <button onClick={handleEditTCs}>Save</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditingTCs(TC.id, TC.terms)}>Edit</button>
                                                    <button onClick={() => handleDeleteTCs(TC.id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-6 col_6">
                    <div className='Add'>
                        <h2>Add New Cancellation Policy :</h2>
                        <input
                            type="text"
                            value={newCP}
                            onChange={(e) => setNewCP(e.target.value)}
                        />
                        <button onClick={handleAddCPs}>Add Cancelling Policy</button>
                    </div>

                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Policy's</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CPs.map((CP) => (
                                    
                                    <tr key={CP.id}>
                                        <td>
                                            {Cp++}

                                        </td>
                                        <td className='bodyoftd'>
                                            {editCPsId === CP.id ? (
                                                <input
                                                    type="text"
                                                    value={editCPsName}
                                                    onChange={(e) => setEditCPsName(e.target.value)}
                                                />
                                            ) : (
                                                CP.cancellation_policy
                                            )}
                                        </td>
                                        <td>
                                            {editCPsId === CP.id ? (
                                                <button onClick={handleEditCPs}>Save</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditingCPs(CP.id, CP.cancellation_policy)}>Edit</button>
                                                    <button onClick={() => handleDeleteCPs(CP.id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            

            <p>Other content specific to import can go here.</p>
        </div>
    );



}
export default InExclusions;
