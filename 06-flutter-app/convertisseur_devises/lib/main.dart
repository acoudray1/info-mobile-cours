import 'package:convertisseur_devises/pages/convertisseur_pages.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Convertisseur de devises'),
        ),
        body: Container(
          padding: EdgeInsets.symmetric(horizontal: 20),
          child: ConvertisseurDevisePage(),
        ),
      ),
    );
  }
}
