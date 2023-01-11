import Button from "@mui/material/Button";

const IconRow = () => (
  <>
    <Button size="small">
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M4 4h7v7H4V4z" fill="#F6465D"></path>
        <path d="M4 13h7v7H4v-7z" fill="#0ECB81"></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
          fill="currentColor"
        ></path>
      </svg>
    </Button>
    <Button size="small">
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M4 4h7v16H4V4z" fill="#0ECB81"></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
          fill="currentColor"
        ></path>
      </svg>
    </Button>
    <Button size="small">
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M4 4h7v16H4V4z" fill="#F6465D"></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
          fill="currentColor"
        ></path>
      </svg>
    </Button>
  </>
);

export default IconRow;
