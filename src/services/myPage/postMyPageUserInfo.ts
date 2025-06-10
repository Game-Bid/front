"use server";

import {MyPageUserInfo} from "@/services/myPage/getMyPageUserInfo";

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
        const res = await fetch(`${apiUrl}/api/v1/auth/my`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
            credentials: "include",
        });

        if (!res.ok) {
            return {
                error: "MyPage UserInfo Api 응답 에러",
                status: res.status,
                statusText: res.statusText,
            };
        }

        const result: MyPageUserInfo = await res.json();
        return {result}
    } catch (err) {
        console.error(err);
    }
}