import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { Inter } from 'next/font/google'
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] })

const postsContent = [
    { name: "Тяжелая промышленность", lat_name: "heavy" }, 
    { name: "Лёгкая промышленность", lat_name: "light" },
    { name: "C/х и пищпром", lat_name: "food" },
    { name: "Наука и образование", lat_name: "science" },
    { name: "Социальная сфера", lat_name: "social" }, 
]
const postsRepublic = [
    { name: "СМСР", lat_name: "union" },
    { name: "ЛМФСР", lat_name: "falle" },
    { name: "СеМСР", lat_name: "seversk" },
    { name: "КаМСР", lat_name: "kalinia" },
    { name: "ПеМСР", lat_name: "pepe" },
    { name: "АвМСР", lat_name: "autohome" },
    { name: "СмМСР", lat_name: "smesharia" },
    { name: "ПуШМСР", lat_name: "pulemet" },
    { name: "СкМСР", lat_name: "skaibir" },
]

const FindPage: NextPage = () => {
    const [sortShow, setSortShow] = useState(false);
    const [sortShowAs, setSortShowAs] = useState<"republic" | "content" | null>(null);
    const [sortShowRepAs, setSortRepShowAs] = useState<string | null>(null);
    const [sortShowConAs, setSortConShowAs] = useState<string | null>(null);

    const { data, refetch } = trpc.findPosts.useQuery({ content: sortShowConAs, republic: sortShowRepAs })

    return (
        <main
      className={`flex min-h-screen flex-col items-center p-12 ${inter.className}`}
    >
        <header className="mb-2 pb-2 border-b-2 border-b-white border-solid">
            <div className='flex gap-4 mb-2 justify-center items-center'>
                <button className='p-2 border-white border-2 border-solid rounded-sm text-sm' onClick={() => setSortShow(s => !s)}>Сортировать</button>
                <div>
                    <h2 className='font-bold text-lg'><b className='text-red-400'>К</b>расная книга<sup>milestone 1</sup></h2>
                </div>
                <Link href={"/add"}>
                    <button className='p-2 border-white border-2 border-solid rounded-sm text-sm'>Добавить</button>
                </Link>
            </div>
            {sortShow && sortShowAs === null && <div className='flex gap-4 justify-center items-center'>
                <button className='p-2 border-white border-2 border-solid rounded-sm text-sm' onClick={() => {setSortShowAs("content");setSortRepShowAs(null);refetch()}}>контенту</button>
                <div>
                    <h2 className='font-bold text-lg'><b className='text-red-400'>С</b>ортировать по ...</h2>
                </div>
                <button className='p-2 border-white border-2 border-solid rounded-sm text-sm' onClick={() => {setSortShowAs("republic");setSortConShowAs(null);refetch()}}>республике</button>
            </div>}
            {sortShow && sortShowAs === "republic" && <div className='flex flex-col gap-4 justify-center items-center'>
                <div className='flex gap-4 justify-center items-center'>
                    <button className='p-2 border-white border-2 border-solid rounded-sm text-sm' onClick={() => {setSortShowAs(null)}}>Назад</button>
                    <div>
                        <h2 className='font-bold text-sm'><b className='text-red-400'>С</b>ортировать по республике</h2>
                    </div>
                </div>
                <div className='flex gap-2 justify-center flex-wrap items-center'>
                    {postsRepublic.map(({ lat_name, name }) => {
                        return (
                            <button className='p-2 border-white border-2 border-solid rounded-sm text-sm' onClick={() => {setSortRepShowAs(lat_name);refetch()}}>{name}</button>
                        )
                    })}
                </div>
            </div>}
            {sortShow && sortShowAs === "content" && <div className='flex flex-col gap-4 justify-center items-center'>
                <div className='flex gap-4 justify-center items-center'>
                    <button className='p-2 border-white border-2 border-solid rounded-sm text-sm' onClick={() => setSortShowAs(null)}>Назад</button>
                    <div>
                        <h2 className='font-bold text-sm'><b className='text-red-400'>С</b>ортировать по контенту</h2>
                    </div>
                </div>
                <div className='flex gap-2 justify-center flex-wrap items-center'>
                {postsContent.map(({ lat_name, name }) => {
                        return (
                            <button className='p-2 border-white border-2 border-solid rounded-sm text-sm' onClick={() => {setSortConShowAs(lat_name);refetch()}}>{name}</button>
                        )
                    })}
                </div>
            </div>}
        </header>
        <div className="flex flex-row flex-wrap mb-4 justify-center gap-2">
            {data && data.map(({ content, link, republic }) => {
                return (
                    <div className="p-2 border-white border-2 border-solid rounded-sm">
                        <p>{link}</p>
                        <div className="text-xs text-gray-600">
                            {postsRepublic.findLast(({ lat_name }) => lat_name === republic)?.name} - {postsContent.findLast(({ lat_name }) => lat_name === content)?.name} - <a href={link} className="underline">Перейти</a>
                        </div>
                    </div>
                )
            })}
            {!data || data.length < 1 && <h2 className="text-gray-600 text-lg font-bold">Ниче не найдено</h2>}
        </div>
        {data && <textarea className='p-2 w-96 border-white border-2 border-solid rounded-sm text-sm bg-transparent' readOnly>
                {data.map(({ link }) => {
                    return `${link}`;
                }).join("\n")}
            </textarea>}
    </main>
    )
};

export default FindPage;