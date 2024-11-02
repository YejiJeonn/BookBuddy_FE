import Header from "../components/Header";

const BasicLayout = ({children}) => {
    return(
        <>
            <Header/>
            <div>
                <main> {children} </main>
                <aside>
                    <h1> Sidebar </h1>
                </aside>
            </div>
        </>
    );
}

export default BasicLayout