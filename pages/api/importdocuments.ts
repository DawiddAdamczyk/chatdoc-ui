import { OLLAMA_HOST } from "@/utils/app/const"


const uploadFile = async (file: File | null, importSource: string) => {
    if (file != null) {
        const formData = new FormData();
        formData.append('collection_name', "test")
        formData.append('file_type', importSource)
        formData.append('document', file);

        try {
          let url = `${OLLAMA_HOST}/v1/collections/documents/upload`;
          const response = await fetch(url, {
            method: "POST", 
            body: formData
        })
        } catch(error) {
          console.error(error)
        }
      }
}

export default uploadFile;