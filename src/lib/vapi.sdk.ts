import Vapi from '@vapi-ai/web';
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_TOKEN!);
console.log(vapi, process.env.NEXT_PUBLIC_VAPI_TOKEN);
