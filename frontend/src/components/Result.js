import React, {useEffect} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { format } from 'date-fns';

const Result = ({formData, result, semester, semester1Modules, semester2Modules, semester1Score, semester2Score, bothSemestersScore, setResult, setShowDialog}) => {
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

    const testIsNew = async () => {
        try {
            const response = await axiosPrivate.patch(
                'users/is-new',
                {id: user?._id},
                {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
                }
            );
            if(response) console.log(response.data);
        } catch (err) {
            console.log(err)
        }
    };

    function printResult(divId) {
        const content = document.getElementById(divId).innerHTML;
      
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Student Bash</title>');
      
        printWindow.document.write(`
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        `);
      
        printWindow.document.write('</head><body class="p-4">');
        printWindow.document.write("<div class='w-full flex items-center justify-center'><img class='text-center' width='100px' src='/unimak.png'/></div>")
        printWindow.document.write(content);
        printWindow.document.write('</body></html>');
      
        printWindow.document.close();
        printWindow.focus();
      
        setTimeout(() => {
          printWindow.print()
          setTimeout(() => {
            printWindow.close();
          }, 500);
        }, 1000);
    }
      

    console.log(user)

  return (
    <>
        {formData && result === "active" && semester && 
            <div className='max-w-3xl w-full flex flex-col items-end'>
            <div id="result" class="main-div w-full mx-auto border bg-white p-4 sm:p-6 font-Montserrat">
                <div class="flex flex-col items-center w-full mb-4">
                <div class="font-bold text-xl">STATEMENT OF RESULTS</div>
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
            
                <div class="text-center font-bold mb-2 text-sm border border-black z-10 p-1 mt-1 bg-[#ded9c3]">{user?.level}</div>
            
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                { semester === "Semester One" || semester === "Both Semesters" ?
                <div>
                    <div class="text-center font-semibold mb-1 border border-black -mt-1 p-1 bg-[#dcedf4]">FIRST SEMESTER</div>
                    <table class="w-full border border-black text-xs">
                    <thead class="bg-[#dcedf4]">
                        <tr>
                        <th class="border border-black p-1">Semester Module</th>
                        <th class="border border-black p-1">Credit Hours</th>
                        <th class="border border-black p-1">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester1Modules.map(module => {
                            return <tr><td class="border border-black p-1">{module.module_name}</td><td class="border border-black p-1 text-center">{module.credits}CHrs</td><td class="border border-black p-1 text-center">{module.grade}</td></tr>
                        })}
                        <tr><td colspan="3" className="border border-black p-1 text-center">Semester Total Grade Point (TGP): <span className=''>{semester1Score.totalGrade}</span></td></tr>
                        <tr><td  colspan="3" class="border border-black p-1 text-center">Semester Cumulative GPA (CGPA): <span className=''>{semester1Score.gpa}</span></td></tr>
                    </tbody>
                    </table>
                </div> : ""
                }
            
                { semester === "Semester Two" || semester === "Both Semesters" ? 
                <div>
                    <div class="text-center font-semibold mb-1 border border-black -mt-1 p-1 bg-[#dcedf4]">SECOND SEMESTER</div>
                    <table class="w-full border border-black text-xs">
                    <thead class="bg-[#dcedf4]">
                        <tr>
                        <th class="border border-black p-1">Semester Module</th>
                        <th class="border border-black p-1">Credit Hours</th>
                        <th class="border border-black p-1">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester2Modules.map(module => {
                            return <tr><td class="border border-black p-1">{module.module_name}</td><td class="border border-black p-1 text-center">{module.credits}CHrs</td><td class="border border-black p-1 text-center">{module.grade}</td></tr>
                        })}
                        <tr><td colspan="3" className="border border-black p-1 text-center">Semester Total Grade Point (TGP): <span className=''>{semester2Score.totalGrade}</span></td></tr>
                        <tr><td  colspan="3" class="border border-black p-1 text-center">Semester Cumulative GPA (CGPA): <span className=''>{semester2Score.gpa}</span></td></tr>
                    </tbody>
                    </table>
                </div> : ""
                }
                </div>
                { semester === "Both Semesters" && <>
                    <div class="text-center text-sm border border-black z-10 p-1 -mt-5">Academic Year Total Grade Point (TGP): <span className='font-normal'>{bothSemestersScore.totalGrade}</span></div>
                    <div class="text-center mb-2 text-sm border border-black z-10 p-1 mt-1">Academic Year Cumulative GPA (CGPA): <span className='font-normal'>{bothSemestersScore.gpa}</span></div>
                </>
                }
                
            
                <div class="text-red-600 text-xs italic">
                NOT ISSUED BY THE UNIVERSITY OF MAKENI. 
                </div>
                <div class="text-red-600 text-xs italic">{format(new Date(), "MMMM Mo, y")}</div>
            </div>
            <div className='flex gap-2'>
                <button onClick={() => {setResult("inactive"); setShowDialog(false)}} className='bg-[#0056b3] text-white py-2 px-5 rounded-md mt-4 mb-8'>Close</button>
                <button onClick={() => printResult("result")} className='bg-[#0056b3] text-white py-2 px-5 rounded-md mt-4 mb-8'>Download</button> 
            </div>
            
            </div>
            }
    </>
  )
}

export default Result