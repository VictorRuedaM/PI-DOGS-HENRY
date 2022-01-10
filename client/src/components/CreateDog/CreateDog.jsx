import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {createDogDB, getDogsTemperaments} from '../../actions/index.actions';
import {useSelector, useDispatch} from 'react-redux';


export function CreateDog(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogsTemperaments());
    }, []);

    const allTemperaments = useSelector((state) => state.dogsTemperaments);

    const [formDog, setFormDog] = useState({

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

    function fff(e){
        
        SetInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        console.log(inputs.hmin)
    }
   


    return(

        <div>
            <Link to={'/home'}><button>Go back to Home</button></Link>

            <h1>Create Dog Breed</h1>

            <form action="">

                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={formDog.name}  />
                </div>

                <div>
                    <label>Min height: </label>
                    <input type="number" name="hmin" min='1' max='49' value={inputs.hmin} onChange={fff}/>
                </div>

                <div>
                    <label>Max height: </label>
                    <input type="number" name="hmax" min='50' max='100' value={inputs.hmax} />
                </div>

                <div>
                    <label>Min weight: </label>
                    <input type="number" name="wmin" min='1' max='49' value={inputs.wmin} />
                </div>

                <div>
                    <label>Max weight: </label>
                    <input type="number" name="wmax" min='50' max='100' value={inputs.wmax} />
                </div>

                <div>
                    <label>Min life years: </label>
                    <input type="number" name="lmin" min='1' max='20'value={inputs.lmin} />
                </div>

                <div>
                    <label>Max life years: </label>
                    <input type="number" name="limin" min='1' max='20'value={inputs.lmax} />
                </div>

                <div>
                    <label>Image: </label>
                    <input type="text" name="image" value={formDog.image} />
                </div>

                <div>
                    <select>
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



        </div>
    )

}

