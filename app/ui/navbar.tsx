import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

const MyNavbar = () => {
    return (
        <nav className={styles.navbar}>            
            <div className="flex flex-row justify-evenly">
                <Link href="/">
                    Home
                </Link>        
                <Image src="/bogdanoff.jpg" alt="Brand" height={64} width={64} className="rounded-full"/>
                <Link href="/about">
                    About
                </Link>                
            </div>        
        </nav>
    )
}

export default MyNavbar;