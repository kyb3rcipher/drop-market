import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

export const notAuthGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const storage = inject(Storage);

  await storage.create();
  const userData = await storage.get('userData');
  
  if (userData) {
    router.navigate(['/']);
    return false;
  }
  
  return true;
};
