"use server";

import {cookies} from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface MyPageUserInfo {
    id: number;
    email: string;
    name: string;
    nickname: string;
    phoneNumber: string;
    birthDate: string;
    favoriteGame: string;
    role: string;
    status: "ACTIVE" | "INACTIVE";
    profileImage: string;
    sellerRating: number;
    buyerRating: number;
    pointBalance: number;
    lastLoginAt: string;
    socialProvider: string;
    socialId: string;
    emailVerified: boolean
}

export const getMyPageUserInfo = async () => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${apiUrl}/api/v1/auth/my`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
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