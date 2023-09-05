import { prisma } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 });
        }

        const isRegisterUser = await prisma.register.findUnique({ where: { email } });

        if (!isRegisterUser) {
            return NextResponse.json({ message: 'Invalid User' }, { status: 404 });
        }

        const isValidPassword = await bcrypt.compare(password, isRegisterUser.password);

        if (!isValidPassword) {
            return NextResponse.json({ message: 'Invalid Password' }, { status: 401 });
        }

        const isLoginUser:any = await prisma.signIn.findUnique({ where: { email } });
        if(isLoginUser?.email==='mazharkamboh914@gmail.com'){

            return NextResponse.json({message:'Already admin login '},{status:200})
        }

        if (isLoginUser) {
            return NextResponse.json({ message: "User Already Logged In" }, { status: 200 });
        }

        const secretKey = process.env.SECRET_KEY;

        if (!secretKey) {
            return NextResponse.json({ message: 'Secret key not found' }, { status: 500 });
        }

        // Creating the JWT token
        const token = jwt.sign({ email: isRegisterUser.email }, secretKey, { expiresIn: "1h" });

        // Updating user's login status and storing the token in MongoDB using Prisma
        const updatedUser = await prisma.signIn.create({
            data: {
                email,
                password: isRegisterUser.password,
                token
            }
        });
           if(email==='mazharkamboh914@gmail.com'){
          
            return NextResponse.json({message:'Admin login successfully',user:updatedUser,token},{status:200})
           }
        return NextResponse.json({ message: 'Login user successfully', user: updatedUser, token }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error in creating user' }, { status: 500 });
    }
};

