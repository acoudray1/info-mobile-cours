import 'package:bonjour_flutter/bouton_contact.dart';
import 'package:bonjour_flutter/my_text.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bonjour Flutter',
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Color(0xffb74093),
          title: Text('Bonjour Flutter'),
        ),
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(children: [
                MyText('Hello this is Flutter', FontWeight.bold, 40),
                MyText('by Axel', FontWeight.w200, 20),
              ],),
              SizedBox(height: 24,),
              Image.network('https://pbs.twimg.com/profile_images/1303350790590025736/lNtbVcql_400x400.jpg',
                height: 350,
                width: 350,
              ),
              SizedBox(height: 24,),
              BoutonContact(),
            ],
          ),
        ),
      ),
    );
  }
}