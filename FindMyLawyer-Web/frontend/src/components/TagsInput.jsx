import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { useEffect } from 'react';


const TagsInput = ({ categoryTags, setCategoriesTags, className, placeholder }) => {

    const { auth } = useContext(AuthContext);
    // const [categoryTags, setCategoriesTags] = useState(keywords);


    const addCategoryTag = async (event) => {

        if (event.key === 'Enter' && categoryTags.length < 5 && event.target.value !== "") {
            setCategoriesTags([...categoryTags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeCategoryTag = async (indexToRemove) => {
        setCategoriesTags(categoryTags.filter((a, index) => index !== indexToRemove));
    };


    useEffect(() => {

        if (categoryTags.length > 0) {
            const updateKeywordsInDb = async () => {

                if (auth) {
                    try {
                        const res = await axios.put(`/lawyers/${auth._id}`, { keywords: categoryTags },
                            {
                                headers: {
                                    "Authorization": `Bearer ${auth.token}`
                                }
                            });
                    } catch (error) {
                        console.log(error);
                    }
                }
            };

            if (auth === {} || auth === null) {
                return;
            } else {
                updateKeywordsInDb();
            }
        }
    }, [auth, categoryTags]);

    return (

        <div className={`standard-input flex flex-grow flex-wrap  ${className}`}>
            <ul className='flex flex-wrap h-2/4 py-0.5'>
                {
                    categoryTags.map((tag, index) => (
                        <li onClick={() => removeCategoryTag(index)} key={index} className='category-tag' >
                            {tag}
                        </li>
                    ))
                }

            </ul>
            <input type="text" placeholder={placeholder ? placeholder : 'Enter Keywords(max 5)'} className='mx-1 bg-transparent outline-none border-none w-full h-2/4 py-0.5' onKeyUp={addCategoryTag} />
        </div>
    );
};

export default TagsInput;