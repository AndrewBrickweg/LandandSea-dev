import Image from "next/image";

const Loading = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src="/images/loading.gif" alt="loading" height={150} width={150} />
    </div>
  );
};

export default Loading;
