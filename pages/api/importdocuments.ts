import { OLLAMA_HOST } from "@/utils/app/const"


const uploadFile = async (file: FileList | null, importSource: string) => {
    if (file != null) {
        const formData = new FormData();
        formData.append('file_type', importSource)

        for (let i = 0; i < file.length; i++) {
          formData.append('documents', file[i]);
        }

        try {
          let url = `${OLLAMA_HOST}/documents/upload`;
          const response = await fetch(url, {
            method: "POST", 
            body: formData
          })
          if (response.status === 200) {
            console.log("Documents uploaded successfully")
          }
        } catch(error) {
          console.error(error)
        }
      }
}

export default uploadFile;