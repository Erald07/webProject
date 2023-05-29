<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use App\Rules\MatchOldPassword;


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

                    // $token = $user->createToken($user->email . '_Token')->plainTextToken;

                    return response()->json([
                        'status' => 200,
                        'message' => "Registration was Successful!",
                        // "username" => $data['first_name'],
                        // "id" => $data,
                        // 'token' => $token,
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
                    "id" => $userDetails->id,
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
    public function update(Request $request, $user_id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|:rfc,dns|email',
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }
        else{
            $user = User::find($user_id);

            if($user){

                $user->email = $request->input('email');
                $user->first_name = $request->input('first_name');
                $user->last_name = $request->input('last_name');

                $user->update();
                return response()->json([
                    'status' => 200,
                    'message' => "Personal Information Updated Successfully!"
                ]);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => "No User ID Found"
                ]);
            }
        }
    }
    public function info()
    {
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $user = User::where('id', $user_id)->get();

            return response()->json([
                'status' => 200,
                'user' => $user,
            ]);
        }
        else{
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }
    public function change_password(Request $request)
    {
        $request->validate([
            'current_password' => ['required', new MatchOldPassword],
            'new_password' => ['required'],
            'new_confirm_password' => ['same:new_password'],
        ]);
   
        User::find(auth()->user()->id)->update(['password'=> Hash::make($request->new_password)]);
   
        return response()->json([
            'status' => 200,
            'message' => 'Password Changed Successfully',
        ]);
    }
}
