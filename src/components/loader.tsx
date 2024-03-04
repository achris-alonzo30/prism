import { Triangle } from "react-loader-spinner"

export const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-full">
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#2bf8b5"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <p className="text-lg font-semibold underline decoration-highlight-color text-primary-color decoration-4">Loading Your Files</p>
        </div>
    )
}