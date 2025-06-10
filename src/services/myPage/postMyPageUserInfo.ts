"use server";

import {MyPageUserInfo} from "@/services/myPage/getMyPageUserInfo";
import {cookies} from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export interface MyPageUserInfoRequest {
    nickname: string;
    name: string;
    password: string;
    passwordConfirm: string;
    phoneNumber: string;
    birthDate: string;
    favoriteGame: string;
}


export const postMyPageUserInfo = async (form: MyPageUserInfoRequest) => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;


        const res = await fetch(`${apiUrl}/api/v1/auth/my`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(form),
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("MyPage UserInfo Api 응답 에러");
        }

        const result: MyPageUserInfo = await res.json();
        return {result}
    } catch (err) {
        console.error(err);
    }
}