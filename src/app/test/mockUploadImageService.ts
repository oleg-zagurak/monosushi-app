export class mockUploadImageService {
    private progress = 0;
  
    async uploadFile(folder: string[], name: string, file: File | null): Promise<string> {
      return Promise.resolve('uploaded');
    }
  
    deleteImg(url: string): Promise<void> {
      return Promise.resolve();
    }
  }