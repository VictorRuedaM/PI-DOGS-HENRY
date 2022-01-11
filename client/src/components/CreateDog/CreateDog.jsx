import React from "react";
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {createDogDB, getDogsTemperaments} from '../../actions/index.actions';
import {useSelector, useDispatch} from 'react-redux';


export function CreateDog(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDogsTemperaments());
    }, []);

    const allTemperaments = useSelector((state) => state.dogsTemperaments);

    const [formDog, SetFormDog] = useState({

        name: '',
        height: '',
        weight: '',
        life_span: '',
        image: '',
        temperament: []
    });

    const [inputs, SetInputs] = useState({
        hmin: 0,
        hmax: 0,
        wmin: 0,
        wmax: 0,
        lmin: 0,
        lmax: 0,
    })

    function handleInputs(e){
        
        SetInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        
        // console.log(inputs)
        
    }

    function handleFormDog(e){

            
        SetFormDog({
            ...formDog,
            [e.target.name]: e.target.value
            
        }) 
          
        
        
        
    }

    function handleSelect(e){

        SetFormDog({
            ...formDog,
            temperament: [...formDog.temperament, e.target.value],
            'height':`${inputs.hmin} - ${inputs.hmax}`,
            'weight':`${inputs.wmin} - ${inputs.wmax}`,
            'life_span':`${inputs.lmin} - ${inputs.lmax} years`,
        });
       
    }
   
    function removeTem(t){
       
        SetFormDog({
            ...formDog,
            temperament: [...formDog.temperament.filter(e => e !== t)]
        });
        

    }

    function handleSubmit(e){

        e.preventDefault();
        
        dispatch(createDogDB(formDog)); 

        console.log(formDog.name)
        alert('Breed created successfully!!!')
        SetInputs({
            hmin: 0,
            hmax: 0,
            wmin: 0,
            wmax: 0,
            lmin: 0,
            lmax: 0,
        });
        SetFormDog({
            name: '',
            height: '',
            weight: '',
            life_span: '',
            image: '',
            temperament: []
        });

        navigate('/home')
    }

    return(

        <div>
            <Link to={'/home'}><button>Go back to Home</button></Link>

            <h1>Create Dog Breed</h1>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={formDog.name} onChange={handleFormDog} />
                </div>

                <div>
                    <label>Min height: </label>
                    <input type="number" name="hmin" min='1' max='100' value={inputs.hmin} onChange={handleInputs}/>
                </div>

                <div>
                    <label>Max height: </label>
                    <input type="number" name="hmax" min='1' max='100' value={inputs.hmax} onChange={handleInputs} />
                </div>

                <div>
                    <label>Min weight: </label>
                    <input type="number" name="wmin" min='1' max='100' value={inputs.wmin} onChange={handleInputs}/>
                </div>

                <div>
                    <label>Max weight: </label>
                    <input type="number" name="wmax" min='1' max='100' value={inputs.wmax} onChange={handleInputs}/>
                </div>

                <div>
                    <label>Min life years: </label>
                    <input type="number" name="lmin" min='1' max='10'value={inputs.lmin} onChange={handleInputs}/>
                </div>

                <div>
                    <label>Max life years: </label>
                    <input type="number" name="lmax" min='10' max='20'value={inputs.lmax} onChange={handleInputs}/>
                </div>

                <div>
                    <label>Image: </label>
                    <input type="text" name="image" value={formDog.image} onChange={handleFormDog}/>
                </div>

                <div>
                    <select onChange={handleSelect}>
                        <option value={'select'}>Select Temperament</option>
                        {
                            allTemperaments && allTemperaments.map(e => 
                                
                                <option value={e.name} key={e.id}>{e.name}</option>
                                )
                        }
                    </select>
                </div>

                <button type="submit">Create Dog</button>
                
                <Link to={'/home'}><button>Cancel</button></Link>
                
            </form>

            <div>
                
                    <ul>
                        {
                            formDog.temperament.map(t => 
                                
                                <li>{t} 
                                <button onClick={() => removeTem(t)}>X</button>
                                </li>
                            )
                        }

                    </ul>
                
            </div>



        </div>
    )

}

