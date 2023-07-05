import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  constructor(private store: Firestore) { }
  private api = '';
  set API(apiKey: string){
    this.api = apiKey;
  }

  getAll(apiPath?: string): Observable<DocumentData[]>{
    let path = this.api;
    if(apiPath) path = apiPath;
    return collectionData( collection(this.store, path), { idField: 'id' } );
  }
  getOne(id: string): Observable<DocumentData>{
    const categoryDocumentReference = doc(this.store, `${this.api}/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }
  create(item: DocumentData): Promise<DocumentReference<DocumentData>>{
    return addDoc(collection(this.store, this.api), item);
  }
  delete(id: string): Promise<void>{
    const categoryDocumentReference = doc(this.store, `${this.api}/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
  update(id: string, item: DocumentData): Promise<void>{
    const categoryDocumentReference = doc(this.store, `${this.api}/${id}`);
    return updateDoc(categoryDocumentReference, {...item});
  }
  getByCategory(category: string): Observable<DocumentData[]> {
    const q = query(collection(this.store, this.api), where('category.path', '==', `${category}`))
    return collectionData( q, { idField: 'id' } );
  }

  getByUser(id: string): Observable<DocumentData[]> {
    const q = query(collection(this.store, this.api), where('userId', '==', `${id}`))
    return collectionData( q, { idField: 'id' } );
  }
}
