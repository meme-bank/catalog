import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const inter = Inter({ subsets: ['latin'] });

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

const AddPage: NextPage = () => {
    const { register, handleSubmit } = useForm<{ url: string; republic: string; content: string }>({
        defaultValues: async () => ({
            content: localStorage.getItem("lastAddedContent") || postsContent[0].lat_name,
            republic: localStorage.getItem("lastAddedRepublic") || postsRepublic[0].lat_name,
            url: ""
        })
    });
    const router = useRouter();
    const { mutate } = trpc.addPost.useMutation({
        onSuccess({ content, republic }) {
            localStorage.setItem("lastAddedContent", content);
            localStorage.setItem("lastAddedRepublic", republic);
            router.push("/find");
        }
    });

    return (
        <main
      className={`flex min-h-screen flex-col items-center p-12 ${inter.className}`}
    >
        <header className="mb-2 pb-2 border-b-2 border-b-white border-solid">
            <div className='flex gap-4 mb-2 justify-center items-center'>
                <Link href={"/find"}>
                    <button className='p-2 border-white border-2 border-solid rounded-sm text-sm'>Найти</button>
                </Link>
                <div>
                    <h2 className='font-bold text-lg'><b className='text-red-400'>К</b>расная книга<sup>milestone 1</sup></h2>
                </div>
            </div>
        </header>
        <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit((data) => {
                mutate(data);
            })}>
                <div className="flex flex-col gap-2">
                    <h2 className='font-bold text-lg'><b className='text-red-400'>Д</b>обавить пост<sup>для сводок</sup></h2>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="url">Ссылка</label>
                        <input className='p-2 border-white border-2 border-solid rounded-sm text-sm bg-transparent' {...register("url", { required: "Вы обязаны указать ссылку на пост" })} type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="content">Тип контента</label>
                        <select className='p-2 border-white border-2 border-solid rounded-sm text-sm bg-transparent' {...register("content", { required: "Вы обязаны указать тип контента поста" })}>
                            {postsContent.map(({ lat_name, name }) => <option className="text-black" value={lat_name}>{name}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="url">Республика</label>
                        <select className='p-2 border-white border-2 border-solid rounded-sm text-sm bg-transparent' {...register("republic")}>
                            {postsRepublic.map(({ lat_name, name }) => <option className="text-black" value={lat_name}>{name}</option>)}
                        </select>
                    </div>
                    <button className='p-2 mt-2 border-white border-2 border-solid rounded-sm text-sm'>Сохранить</button>
                </div>
            </form>
        </div>
    </main>
    )
};

export default AddPage;