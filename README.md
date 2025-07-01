## 📱 Compilar y ejecutar la aplicación en Android e iOS

### Prerrequisitos

- Node.js y npm instalados
- Ionic CLI instalado globalmente (`npm install -g @ionic/cli`)
- Capacitor instalado (`npm install @capacitor/core @capacitor/cli`)
- Git instalado
- Para Android: Android Studio y Java JDK
- Para iOS: Xcode (solo en Mac)

---

### 1. Instalar dependencias

```bash
npm install
```

---

### 2. Compilar la aplicación web

```bash
ionic build
```

---

### 3. Sincronizar con Capacitor

```bash
npx cap sync
```

---

### 4. Ejecutar en Android

1. Agrega la plataforma Android (solo la primera vez):

    ```bash
    npx cap add android
    ```

2. Abre el proyecto en Android Studio:

    ```bash
    npx cap open android
    ```

3. Desde Android Studio, selecciona un emulador o dispositivo físico y haz clic en **Run**.

---

### 5. Ejecutar en iOS (solo en Mac)

1. Agrega la plataforma iOS (solo la primera vez):

    ```bash
    npx cap add ios
    ```

2. Abre el proyecto en Xcode:

    ```bash
    npx cap open ios
    ```

3. Desde Xcode, selecciona un simulador o dispositivo físico y haz clic en **Run**.

---

### 6. Notas

- Cada vez que modifiques el código fuente, ejecuta `ionic build` y `npx cap sync` antes de abrir en Android Studio/Xcode.
- Para pruebas rápidas en navegador, usa:

    ```bash
    ionic serve
    ```

---

¿Tienes dudas sobre algún paso? ¡Revisa la [documentación oficial de Ionic](https://ionicframework.com/docs) y [Capacitor](https://capacitorjs.com/docs)! 🚀