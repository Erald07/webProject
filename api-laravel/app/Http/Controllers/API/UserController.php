<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function view()
    {
        $user = User::all();
        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }
    public function registerUser(Request $request)
    {
        if($request->isMethod('POST')){

            $data = $request->input();

            $userEmail = User::where('email', $data['email'])->exists();
            if(!$userEmail){

                $val = $request->validate([
                    'email' => 'required|:rfc,dns|unique:users,email',
                    'password' => ['required', Password::min(8)->letters()->numbers()->symbols()->mixedCase()],
                    'first_name' => 'required',
                    'last_name' => 'required',
                ]);

                if($val){

                    $user = new User;
                    $user->email = $data['email'];
                    $user->password = Hash::make($data['password']);
                    $user->first_name = $data['first_name'];
                    $user->last_name = $data['last_name'];

                    $user->save();

                    $token = $user->createToken($user->email . '_Token')->plainTextToken;

                    return response()->json([
                        'status' => 200,
                        'message' => "Registration was Successful!",
                        "username" => $data['first_name'],
                        'token' => $token,
                    ]);
                }
                else{
                    return response()->json([
                        'status' => 400,
                        'message' => "Something went wrong."
                    ]);
                }
            }
            else{
                return response()->json([
                    'status' => 400,
                    'message' => "Email already exists.",
                ]);
            }

        }
    }
    public function loginUser(Request $request)
    {   
        if($request->isMethod('POST')){
            $data = $request->input();

            $userDetails = User::where('email', $data['email'])->first();

            if( !$userDetails || !password_verify($data['password'], $userDetails->password)){
                return response()->json([
                    'status' => 400,
                    'message' => "Invalid credentials.!"
                ]);
            }
            else{
                if($userDetails->role_as == 1){
                    $role = 'admin';
                    $token = $userDetails->createToken($userDetails->email . '_AdminToken', ['server:admin'])->plainTextToken;
                }
                else{
                    $role = 'user';
                    $token = $userDetails->createToken($userDetails->email . '_Token', [''])->plainTextToken;
                }

                return response()->json([
                    'status' => 200,
                    "username" => $userDetails->first_name,
                    'token' => $token,
                    'message' => "Login Successfully!",
                    'role' => $role,
                ]);
            }
        }
    }
    public function logout()
    {
        Auth::user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json([
            'status' => 200,
            'message' => "Logged out Successfully!"
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|:rfc,dns|unique:users,email',
            'password' => 'required|min:8|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/',
            'confirmPassword' => 'required|min:8|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/|same:password',
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        }
        else{
            $user = new User;

            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            $user->role_as = 1;

            $user->save();
            return response()->json([
                'status' => 200,
                'message' => "User Added Successfull"
            ]);
        }
    }
}
