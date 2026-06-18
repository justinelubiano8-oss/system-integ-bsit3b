<template>
 
  <v-container class="fill-height d-flex align-center justify-center">
    
    
    <v-card width="400" class="pa-6" elevation="2">
      
     
      <v-card-title class="text-center text-h5 font-weight-bold">LOGIN</v-card-title>
      <v-card-subtitle class="text-center mb-4">Welcome back, please login</v-card-subtitle>

     
      <v-card-text>
        
       
        <v-text-field 
          label="Email" 
          prepend-inner-icon="mdi-email" 
          variant="outlined"
          class="mb-2"
        ></v-text-field>

        
        <v-text-field 
          label="Password" 
          type="password" 
          prepend-inner-icon="mdi-lock" 
          variant="outlined"
          class="mb-4"
        ></v-text-field>

       
        <v-btn color="blue" block size="large" class="mb-3">
          Sign In
        </v-btn>

        <div class="text-center my-2 text-caption text-grey">OR</div>

        
        <v-btn color="red-darken-1" block size="large" prepend-icon="mdi-google" @click="HandleGoogleLogin">
           Sign in with Google
        </v-btn>
          
       <div ref="googleButton"></div>

      </v-card-text>
      
    </v-card>

  </v-container>
</template>

<script lang="ts" setup>
//@ts-nocheck
const config = useRuntimeConfig()
const googleButton = ref<HTMLDivElement | null>(null)

  declare global {
    interface Window {
      google: any;
    }
  }

const handleGoogleLogin = (response: any) => {
  console.log("Handle Google Login")
  const user = parseJwt(response.credential);

  localStorage.setItem("google_user", JSON.stringify(user));
  localStorage.setItem("google_token", response.credential);

  navigateTo("/")
}

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g);
  return JSON.parse(
    decodeURIComponent(
      atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
    )
  );
};

onMounted(() => {
  const timer = setInterval(() => {
    if (window.google && googleButton.value) {
      clearInterval(timer)

      window.google.accounts.id.initialize({
        client_id: config.public.googleClientId,
        callback: handleGoogleLogin
      })

      window.google.accounts.id.renderButton(googleButton.value, {
        theme: 'outline',
        size: 'large',
        width: 330
      })

    }
  }, 300)
})
</script>