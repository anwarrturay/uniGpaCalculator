import React, {useEffect, useState} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { format } from 'date-fns';
import { CheckCheck, Download, Save, LoaderCircle } from 'lucide-react';

const Result = ({formData, result, semester, semester1Modules, semester2Modules, semester1Score, semester2Score, bothSemestersScore, setResult, setShowDialog}) => {
    const [saved, setSaved] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")
    const now = new Date();
    const {auth, user, setUser} = useAuth()
    const userId = auth?.userId;
    const axiosPrivate = useAxiosPrivate();
    useEffect(()=>{
        const fetchUserData = async ()=>{
    
            if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
            }
    
            try{
            const response = await axiosPrivate.get(`/users/${userId}`);
            setUser(response.data);
            }catch(err){
            console.error("Error fetching user data:", err);
            }
        }
        fetchUserData();
    }, [userId])

    // const testIsNew = async () => {
    //     try {
    //         const response = await axiosPrivate.patch(
    //             'users/is-new',
    //             {id: user?._id},
    //             {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             withCredentials: true
    //             }
    //         );
    //         if(response) console.log(response.data);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // };

    async function printResult(divId) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log(isMobile)
        const content = document.getElementById(divId).innerHTML;
    
        if (isMobile) {
            document.head.innerHTML += `
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
            `
            document.body.innerHTML = `
                <div class="w-full flex flex-col gap-1 items-center justify-center mb-2 mt-5">
                    <img class="text-center" width="50px" src="/miskul_icon.png"/>
                    <img class="text-center" width="100px" src="/miskul_wordmark.png"/>
                </div>
                ${content}
            `;
            setTimeout(()=> {
                window.print();
                setTimeout(()=>{
                    location.reload();
                },3000)
            }, 2000)
             // Restore original content
        } else {
            // Existing window.open logic for desktop
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write('<html><head><title>Miskul App</title>');
            printWindow.document.write(`
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
              `);
            printWindow.document.write(`
                <style>
                    @page { margin: 0; }
                    body { margin: 1cm; }
                </style>
            `);
            printWindow.document.write('</head><body class="p-4">');
            printWindow.document.write(`
                <div class="w-full flex flex-col gap-1 items-center justify-center mb-2 mt-5">
                    <img class="text-center" width="50px" src="/miskul_icon.png"/>
                    <img class="text-center" width="100px" src="/miskul_wordmark.png"/>
                </div>
            `);
            printWindow.document.write(content);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                setTimeout(() => printWindow.close(), 500);
            }, 1000);
        }
    }

    async function saveHistory () {
        let history;
        if(semester === "Semester One"){
            history = {department: user?.department, level: user?.level, userId, type: "semester1", semester1Modules, semester1Score}
        }
        if(semester === "Semester Two"){
            history = {department: user?.department, level: user?.level, userId, type: "semester2", semester2Modules, semester2Score}
        }
        if(semester === "Both Semesters"){
            history = {department: user?.department, level: user?.level, userId, type: "both", semester1Modules, semester1Score, semester2Modules, semester2Score, bothSemestersScore}
        }
        try {
            setIsSaving(true)
            const response = await axiosPrivate.post(
                `users/history/${userId}`,
                history,
                {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
                }
            );
            if(response) setIsSaving(false);
            if(response.data.message === "History successfully saved!") setSaved(true);
        } catch (err) {
            if(err.status === 400){
                setError("Limit reached: Delete an old result to add a new one.")
            }
            setIsSaving(false);
            console.log(err)
        }
    }

  return (
    <>
        {formData && result === "active" && semester && 
            <div className='max-w-3xl w-full flex flex-col gap-2 items-end'>
            <div id="result" className="main-div w-full mx-auto border bg-white p-4 sm:p-6 font-Montserrat">
                <div className="flex flex-col items-center w-full mb-4">
                <div className="text-xl">STATEMENT OF RESULTS</div>
                </div>

                <table className='text-sm w-full'>
                    <tbody>
                        <tr>
                            <td className='border-black py-1 border-[0.5px] px-2 font-bold w-[20%]'>NAME</td>
                            <td className='border-black py-1 border-[0.5px] px-2'>{user?.firstname} {user?.lastname}</td>
                        </tr>
                        <tr>
                            <td className='border-black py-1 border-[0.5px] px-2 font-bold'>ID NO.</td>
                            <td className='border-black py-1 border-[0.5px] px-2'>{user?.idNumber}</td>
                        </tr>
                        <tr>
                            <td className='border-black py-1 border-[0.5px] px-2 font-bold'>DEPARTMENT</td>
                            <td className='border-black py-1 border-[0.5px] px-2'>{user?.department}</td>
                        </tr>
                        <tr>
                            <td className='border-black py-1 border-[0.5px] px-2 font-bold'>PROGRAM</td>
                            <td className='border-black py-1 border-[0.5px] px-2'>Degree</td>
                        </tr>
                    </tbody>
                </table>
            
                <div className="text-center font-bold mb-2 text-sm border border-black z-10 p-1 mt-1 bg-[#ded9c3]" style={{backgroundColor: "#ded9c3"}}>{user?.level}</div>
            
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                { semester === "Semester One" || semester === "Both Semesters" ?
                <div>
                    <div className="text-center font-semibold mb-1 border border-black -mt-1 p-1 bg-[#dcedf4]" style={{backgroundColor: "#dcedf4"}}>FIRST SEMESTER</div>
                    <table className="w-full border border-black text-xs">
                    <thead className="bg-[#dcedf4]" style={{backgroundColor: "#dcedf4"}} >
                        <tr>
                        <th className="border border-black p-1">Semester Module</th>
                        <th className="border border-black p-1">Credit Hours</th>
                        <th className="border border-black p-1">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester1Modules.map(module => {
                            return <tr key={module.module_name}><td className="border border-black p-1">{module.module_name}</td><td className="border border-black p-1 text-center">{module.credits}CHrs</td><td className="border border-black p-1 text-center">{module.grade}</td></tr>
                        })}
                        <tr><td colSpan="3" className="border border-black p-1 text-center">Semester Total Grade Point (TGP): <span className=''>{semester1Score.totalGrade}</span></td></tr>
                        <tr><td  colSpan="3" className="border border-black p-1 text-center">Semester Cumulative GPA (CGPA): <span className=''>{semester1Score.gpa}</span></td></tr>
                    </tbody>
                    </table>
                </div> : ""
                }
            
                { semester === "Semester Two" || semester === "Both Semesters" ? 
                <div>
                    <div className="text-center font-semibold mb-1 border border-black -mt-1 p-1 bg-[#dcedf4]" style={{backgroundColor: "#dcedf4"}}>SECOND SEMESTER</div>
                    <table className="w-full border border-black text-xs">
                    <thead className="bg-[#dcedf4]" style={{backgroundColor: "#dcedf4"}}>
                        <tr>
                        <th className="border border-black p-1">Semester Module</th>
                        <th className="border border-black p-1">Credit Hours</th>
                        <th className="border border-black p-1">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester2Modules.map(module => {
                            return <tr><td className="border border-black p-1">{module.module_name}</td><td className="border border-black p-1 text-center">{module.credits}CHrs</td><td className="border border-black p-1 text-center">{module.grade}</td></tr>
                        })}
                        <tr><td colspan="3" className="border border-black p-1 text-center">Semester Total Grade Point (TGP): <span className=''>{semester2Score.totalGrade}</span></td></tr>
                        <tr><td  colspan="3" className="border border-black p-1 text-center">Semester Cumulative GPA (CGPA): <span className=''>{semester2Score.gpa}</span></td></tr>
                    </tbody>
                    </table>
                </div> : ""
                }
                </div>
                { semester === "Both Semesters" && <>
                    <div className="text-center text-sm border border-black z-10 p-1 -mt-5">Academic Year Total Grade Point (TGP): <span className='font-normal'>{bothSemestersScore.totalGrade}</span></div>
                    <div className="text-center mb-2 text-sm border border-black z-10 p-1 mt-1">Academic Year Cumulative GPA (CGPA): <span className='font-normal'>{bothSemestersScore.gpa}</span></div>
                </>
                }
                
            
                <div className="text-red-600 text-xs italic">
                NOT ISSUED BY THE UNIVERSITY OF MAKENI. 
                </div>
                <div className="text-red-600 text-xs italic">{format(now, "MMMM do, y")}</div>
            </div>
            {error && <div className="text-red-600 text-xs italic">{error}</div>}
            <div className='flex gap-2'>
                <button onClick={() => {setResult("inactive"); setShowDialog(false); setSaved(false); setError(null)}} className='bg-[#070181] text-white py-2 px-5 rounded-md mb-8'>Close</button> 
                <button disabled={saved} onClick={saveHistory} className='bg-[#070181] text-white py-2 px-4 rounded-md mb-8 flex items-center justify-center gap-1 disabled:bg-gray-500'>{isSaving? <div className='flex gap-2'><div className='animate-spin'><LoaderCircle /></div><>Saving...</></div> : saved ? <><CheckCheck size={18} />Saved</> : <><Save size={16} />Save</>}</button> 
                <button onClick={() => printResult("result")} className='bg-[#070181] text-white py-2 px-4 rounded-md mb-8 flex items-center justify-center gap-1'><Download size={16} />Download</button> 
                {/* <button onClick={testIsNew}>Test</button> */}
            </div>
            
            </div>
            }
    </>
  )
}

export default Result