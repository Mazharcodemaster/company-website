import { prisma } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Please fill all fields' }, { status: 404 });
        }

        const isRegisterUser = await prisma.register.findUnique({ where: { email } });

        if (isRegisterUser) {
            return NextResponse.json({ message: 'Already Signed Up User' }, { status: 200 });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.register.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        });

        return NextResponse.json({ message: 'Create user successfully', user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error in creating user' }, { status: 500 });
    }
};


// import { prisma } from "@/db/config";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// export const POST=async(req:NextRequest)=>{
//     try {
//         const {name,email,password}= await req.json()
//     console.log(name,email,password)
//     if(!name&&email&&password){
//         return NextResponse.json({message:'Please fill all fields'},{status:404})

//     }
//     if(!name){
//         return NextResponse.json({message:'Enter your name'},{status:404})
//     }
//     if(!email){
//         return NextResponse.json({message:'Enter your email'},{status:404})
//     }
//     if(!password){
//         return NextResponse.json({message:'Enter your password'},{status:404})
//     }
//     const  isRegisterUser= await prisma.register.findUnique({where:{email}})
//     if(isRegisterUser){
//         return NextResponse.json({message:'Already SignUp User'},{status:200})
//     }
//     const hashPassword= await bcrypt.hash(password,10) 
//     const user= await prisma.register.create({data:{
//         name,
//         email,
//         password:hashPassword
//     }}) 
//     return NextResponse.json({message:'Create user successfully',user},{status:200})
//     } catch (error) {
//         return NextResponse.json({message:'Eroor in create user'},{status:500})
//     }
// }