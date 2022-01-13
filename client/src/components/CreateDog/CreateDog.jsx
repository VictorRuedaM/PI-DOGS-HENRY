import React from "react";
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {createDogDB, getDogsTemperaments} from '../../actions/index.actions';
import {useSelector, useDispatch} from 'react-redux';



function validateInputs(inputs){
    let errorsInputs = {};

    if(inputs.hmin < 0 || inputs.hmin > 50){
        errorsInputs.hmin = 'Require field, please write a valid number between 1 and 50'
    }
    if(inputs.hmax < 0 || inputs.hmax > 100){
        errorsInputs.hmax = 'Require field, please write a valid number between 1 and 100'
    }
    
    if(inputs.hmax < inputs.hmin ){
        errorsInputs.hmax = 'The maximum value cannot be less than the minimun'
    }
    

    if(inputs.wmin < 0 || inputs.wmin > 60){
        errorsInputs.wmin = 'Require field, please write a valid number between 1 and 60'
    }
    if(inputs.wmax < 0 || inputs.wmax > 100){
        errorsInputs.wmax = 'Require field, please write a valid number between 1 and 100'
        
    }
    if(inputs.wmax < inputs.wmin ){
        errorsInputs.wmax = 'The maximum value cannot be less than the minimun'
    }

    if(inputs.lmin < 0 || inputs.lmin > 10){
        errorsInputs.lmin = 'Require field, please write a valid number between 1 and 10'
    }
    if(inputs.lmax < 0 || inputs.lmax > 25){
        errorsInputs.lmax = 'Require field, please write a valid number between 1 and 25'
    }

    if(inputs.lmax < inputs.lmin ){
        errorsInputs.lmax = 'The maximum value cannot be less than the minimun'
    
    }

    

   
    

    return errorsInputs;
}

function validateFormDog(formDog){

    let errors = {}; 

    if(!formDog.name) {
        errors.name = 'Name is required'
      } else if (parseInt(formDog.name)) {
        errors.name = 'Name is invalid, please write a text'
      }

    

    return errors;
}




export function CreateDog(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDogsTemperaments());
    }, []);

    const allTemperaments = useSelector((state) => state.dogsTemperaments);

    const [errors, setErrors] = useState({});
    const [dogErr, setDogErr] = useState({});
    const [errorForm, setErrorForm] = useState('')

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
        });

        setErrors(validateInputs({
            ...inputs,
            [e.target.name]: e.target.value
        }))
        
        // console.log(inputs)
        
    }

    function handleFormDog(e){

            
        SetFormDog({
            ...formDog,
            [e.target.name]: e.target.value
            
        });
        
        setDogErr(validateFormDog({
            ...formDog,
            [e.target.name]: e.target.value
        }))
          
        
        
        
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
        
        
        if(Object.keys(dogErr).length || Object.keys(errors).length || formDog.name === ''){

            alert('¡¡¡Verify that the fields are not empty or with incorrect parameters to create the race!!!')
            
        }else{
            let a = dispatch(createDogDB(formDog)); 
            alert('Breed created successfully!!!')
            console.log(a)
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
        

        // console.log(Object.keys(dogErr).length, Object.keys(errors).length)
        
       
    }

    return(

        <div>
            <Link to={'/home'}><button>Go back to Home</button></Link>

            <h1>Create Dog Breed</h1>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <label>Name: </label>
                    <input type="text" name="name"  value={formDog.name} onChange={handleFormDog} />
                    {dogErr.name && (<p>{dogErr.name}</p>)}
                </div>

                <div>
                    <label>Min height: </label>
                    <input type="number" name="hmin"  value={inputs.hmin} onChange={handleInputs}/>
                    {errors.hmin && (<p>{errors.hmin}</p>)}
                </div>

                <div>
                    <label>Max height: </label>
                    <input type="number" name="hmax"  value={inputs.hmax} onChange={handleInputs} />
                    {errors.hmax && (<p>{errors.hmax}</p>)}
                </div>

                <div>
                    <label>Min weight: </label>
                    <input type="number" name="wmin"  value={inputs.wmin} onChange={handleInputs}/>
                    {errors.wmin && (<p>{errors.wmin}</p>)}
                </div>

                <div>
                    <label>Max weight: </label>
                    <input type="number" name="wmax"  value={inputs.wmax} onChange={handleInputs}/>
                    {errors.wmax && (<p>{errors.wmax}</p>)}
                </div>

                <div>
                    <label>Min life years: </label>
                    <input type="number" name="lmin" value={inputs.lmin} onChange={handleInputs}/>
                    {errors.lmin && (<p>{errors.lmin}</p>)}
                </div>

                <div>
                    <label>Max life years: </label>
                    <input type="number" name="lmax" value={inputs.lmax} onChange={handleInputs}/>
                    {errors.lmax && (<p>{errors.lmax}</p>)}
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

                <button type="submit" >Create Dog</button>
                
                <Link to={'/home'}><button>Cancel</button></Link>
                <p>{errorForm}</p>
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

