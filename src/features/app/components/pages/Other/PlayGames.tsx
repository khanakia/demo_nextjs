import Link from "next/link";

export default function Playgames() {
  return (
    <>
			<div className="row">
        <div className="col-md-4">
            <Link href={"/member/mk/sessions"}>
              <a>
                <img src="https://filmdaily.co/wp-content/uploads/2021/11/Satta-lede-1300x691.jpeg" />
              </a>
            </Link>
        </div>
      </div>
    </>
  );
}
